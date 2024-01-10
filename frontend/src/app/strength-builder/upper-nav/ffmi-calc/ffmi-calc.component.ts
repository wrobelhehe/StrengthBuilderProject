import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogClose } from '../../abstracts/dialog-close.abstract';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import { FFMI_DATA } from '../../../../app/data/mocks/calculators-data.mock';

@Component({
  selector: 'app-ffmi-calc',
  templateUrl: './ffmi-calc.component.html',
  styleUrls: ['./ffmi-calc.component.scss']
})
export class FfmiCalcComponent extends DialogClose {

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
        max: 30,
        ticks: {
          color: "white",
        }
      }
    },


  };


  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['FFMI'],
    datasets: [
      {
        data: [], label: 'FFMI', backgroundColor: "#3c86cf",
      },

    ],
  };

  ffmiScore!: number
  isCalculated: boolean = false;
  displayedColumns: string[] = ['ffmi', 'description'];
  dataSource = FFMI_DATA;
  personalFormGroup = this.formBuilder.group({
    weight: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    height: ['', [Validators.required, Validators.min(1), Validators.max(280)]],
    bf: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
  })

  constructor(dialogRef: MatDialogRef<any>, private formBuilder: FormBuilder, private translate: TranslateService,) {
    super(dialogRef)
  }

  resetCalculator() {
    this.isCalculated = false;
    this.personalFormGroup.reset()
  }

  public calculateFFMI(): void {
    const weight: any = this.personalFormGroup.get('weight')?.value;
    const height: any = this.personalFormGroup.get('height')?.value;
    const bf: any = this.personalFormGroup.get('bf')?.value;


    const heightInMeters = height / 100;
    const leanMass = weight * (1 - bf / 100);
    const ffmi = leanMass / (heightInMeters * heightInMeters);
    const ffmiRounded = parseFloat(ffmi.toFixed(2));

    this.ffmiScore = ffmiRounded;
    this.updateChartData(ffmiRounded);
    this.isCalculated = true;
    console.log(this.ffmiScore)
  }


  private updateChartData(ffmi: number): void {
    this.barChartData.datasets[0].data.push(ffmi)
  }



}
