import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from './../service/question.service';
import { interval, Subscription } from 'rxjs';

const QUIZ_MAX_TIME = 600000; // 10 minutes in milliseconds

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  name: string = '';
  questionList: any[] = [];
  currentQuestion: number = 0;
  points: number = 0;
  timer: number = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: Subscription | undefined;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.getAllQuestions();
    this.startCounter();
  }

  ngOnDestroy(): void {
    this.stopCounter();
  }

  getAllQuestions(): void {
    this.questionService.getQuestionJson().subscribe((response) => {
      this.questionList = this.shuffle(response.questions);
    });
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  answer(currentQno: number, option: any): void {
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
    } else {
      this.inCorrectAnswer++;
    }

    setTimeout(() => {
      this.currentQuestion++;
      this.resetCounter();
      this.updateProgressPercent();
    }, 500);

    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
  }

  startCounter(): void {
    this.interval$ = interval(1000).subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        this.currentQuestion++;
        this.timer = 60;
      }
    });

    setTimeout(() => {
      this.stopCounter();
    }, QUIZ_MAX_TIME);
  }

  stopCounter(): void {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
    this.timer = 0;
  }

  resetCounter(): void {
    this.stopCounter();
    this.timer = 60;
    this.startCounter();
  }

  updateProgressPercent(): void {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
  }

  getProgressPercent(): string {
    return this.progress;
  }
}
