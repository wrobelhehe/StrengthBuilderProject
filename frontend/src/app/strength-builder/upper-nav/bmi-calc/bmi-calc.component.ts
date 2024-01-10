import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogClose } from '../../abstracts/dialog-close.abstract';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import { BMI_DATA } from '../../../../app/data/mocks/calculators-data.mock';

@Component({
  selector: 'app-bmi-calc',
  templateUrl: './bmi-calc.component.html',
  styleUrls: ['./bmi-calc.component.scss']
})
export class BmiCalcComponent extends DialogClose {

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'white'
        },
        ticks: {
          color: "white"
        }

      },
      y: {
        grid: {
          color: 'white'
        },
        min: 0,
        max: 40,
        ticks: {
          color: "white"
        }
      }
    },


  };


  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['BMI'],
    datasets: [
      {
        data: [], label: 'BMI', backgroundColor: "#3c86cf",
      },

    ],
  };

  bmiScore!: number
  isCalculated: boolean = false;
  displayedColumns: string[] = ['bmi', 'description'];
  dataSource = BMI_DATA;
  personalFormGroup = this.formBuilder.group({
    weight: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    height: ['', [Validators.required, Validators.min(1), Validators.max(280)]],
  })

  constructor(dialogRef: MatDialogRef<any>, private formBuilder: FormBuilder, private translate: TranslateService,) {
    super(dialogRef)
  }

  resetCalculator() {
    this.isCalculated = false;
    this.personalFormGroup.reset()
  }


  calculateBMI() {
    const weight: any = this.personalFormGroup.get('weight')?.value;
    const height: any = this.personalFormGroup.get('height')?.value; // przelicz na metry

    const heightInMeters = height / 100;

    if (weight > 0 && heightInMeters > 0) {
      const bmi = weight / (heightInMeters * heightInMeters);
      const bmiRounded = +bmi.toFixed(2) // zaokrąglenie do dwóch miejsc po przecinku

      this.bmiScore = bmiRounded

      this.barChartData.datasets[0].data = [bmiRounded];
      this.isCalculated = true;
    }
  }

}
