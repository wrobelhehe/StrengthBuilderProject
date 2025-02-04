import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogClose } from '../../abstracts/dialog-close.abstract';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends DialogClose implements OnInit {

  filteredFaqs: any = [];

  panelOpenState = false;

  isActive = false;

  hasNoResults = false;

  searchQuery = ''

  faqForm: FormGroup;


  faqs = [
    { question: 'faq_question1', answer: 'faq_anwser1' },
    { question: 'faq_question2', answer: 'faq_anwser2' },
    { question: 'faq_question3', answer: 'faq_anwser3' },
    { question: 'faq_question4', answer: 'faq_anwser4' },
    { question: 'faq_question5', answer: 'faq_anwser5' },
    { question: 'faq_question6', answer: 'faq_anwser6' },
    { question: 'faq_question7', answer: 'faq_anwser7' },
    { question: 'faq_question8', answer: 'faq_anwser8' },
    { question: 'faq_question9', answer: 'faq_anwser9' },
    { question: 'faq_question10', answer: 'faq_anwser10' },
    { question: 'faq_question11', answer: 'faq_anwser11' },
    { question: 'faq_question12', answer: 'faq_anwser12' },
    { question: 'faq_question13', answer: 'faq_anwser13' },
    { question: 'faq_question14', answer: 'faq_anwser14' }
  ];


  constructor(modalService: NgbModal, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private translateService: TranslateService) {
    super(modalService)

    this.faqForm = this.formBuilder.group({
      query: [''],

    });
  }

  ngOnInit() {
    this.faqForm.get('query')?.valueChanges.subscribe(value => {
      this.filterFaqs(value);
    });
    this.filteredFaqs = this.faqs
  }

  filterFaqs(searchQuery: string) {
    const translatedFaqs: any[] = [];

    this.faqs.forEach(faq => {
      this.translateService.get(faq.question).subscribe(translatedQuestion => {
        translatedFaqs.push({ question: translatedQuestion, answer: faq.answer });

        this.filteredFaqs = translatedFaqs.filter(translatedFaq =>
          translatedFaq.question.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (searchQuery && this.filteredFaqs.length === 0) {
          this.faqForm.controls['query'].setErrors({ 'noResults': true });
        } else {
          this.faqForm.controls['query'].setErrors(null);
        }
        this.cdr.detectChanges();
      });
    });
  }

}
