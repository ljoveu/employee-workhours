import { Component } from '@angular/core';
import { EmployeeAPIService } from './services/employee-api-service'
import { Employee } from './classes/employee';
import { __values } from 'tslib';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _EmployeeAPIService: EmployeeAPIService) {
  }

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  }

  chartSeries: ApexNonAxisChartSeries = [];
  chartLabels: any;

  employeeList: Employee[]; //Prvo preuzimanje podataka iz API-a
  result: any; //Uzimanje samo bitnih polja koja ce biti stampana

  //**************************************************
  print: any; //Poslednje filtriranje kao i varijabla koja cuva poslednje podatke(glavna)
  //**************************************************

  names: any;
  hours: any;

  //Inicira se http servis, preuzimaju i cuvaju podaci u data, zatim employeeList preuzima podatke iz data
  ngOnInit() {
    this._EmployeeAPIService
      .getEmployee()
      .subscribe(data => {
        this.employeeList = this.returnEmployeePrintProperties(data);
        this.result = this.employeeList
        this.print = this.printValues(this.result);
        this.print = this.sortData(this.print);
        

        //pie chart
        this.names = this.onlyNames(this.print);
        this.names = this.nameArr(this.names)
        console.log(this.names)
        this.hours = this.onlyHours(this.print);
        this.hours = this.hoursArr(this.hours);
        console.log(this.hours);
        this.chartSeries = this.hours;
        console.log();
        this.chartLabels = this.names;
      }
      )
  }


  public hoursArr(data: any) {
    let result = [];
    for (var i in data) {
      result.push(data[i]);
    }
    return result;
  }

  public nameArr(data: any) {
    let result = [];
    for (var i in data) {
      result.push(data[i]);
    }
    return result;
  }


  public onlyHours(data: any) {
    let hrs = data.map((emp: any) => {
      return emp.Hours
    })
    return hrs;
  }


  public onlyNames(data: any) {
    let names = data.map((emp: any) => {
      return emp.Name
    })
    return names;
  }


  //Metoda koja vraca polja koja zelimo da prikazemo u tabeli
  public returnEmployeePrintProperties(data: any) {
    let newemp = data.map((emp: any) => {
      return { "Name": emp.EmployeeName, "Hours": this.calculateWorkTime(emp) }
    })
    return newemp;
  }

  
  //Poslednja *filter* metoda koja proverava za duplikate u imenu, i za svaki duplikat izracunava ukupnu sumu odradjenih sati
  public printValues(data: any) {
    let sumMap = new Map();
    for (let emp of data) {
      if (emp.Name) {
        const hoursAcc = sumMap.get(emp.Name)
        if (hoursAcc) {
          hoursAcc.Hours += emp.Hours
        } else {
          sumMap.set(emp.Name, emp)
        }
      }
    }
    const arr = Array.from(sumMap, ([, value]) => value)
    return arr;
  }


  // Funkcija koja ispravlja unos zaposlenog, izracunava ukupno prijavljeno vreme na poslu..
  public calculateWorkTime(dataDate: any) {
    let startdate = new Date(dataDate.StarTimeUtc).getTime(); //StartTime
    let enddate = new Date(dataDate.EndTimeUtc).getTime();    //EndTime
    let curr = enddate; //Temp za EndTime

    //Proverava se da li je pogresno unet podatak gde korisnik nekako putuje kroz vreme
    if (startdate > enddate) {
      enddate = startdate;
      startdate = curr;
      let TotalTime = enddate - startdate;

      let diffHour = Math.floor((TotalTime % 86400000) / 3600000); //Izracunavanje sata
      
      return diffHour
    }
    else if (enddate > startdate) {
      let TotalTime = enddate - startdate;

      let diffHour = Math.floor((TotalTime % 86400000) / 3600000); //Izracunavanje sata
      
      return diffHour
    }
    else return 0;
  }


  //Sortiranje

  //Sortiranje podataka od najvise radnih sati do najmanje
  public sortData(data: any) {
    let order = data;
    if (order) {
      let newarr = data.sort((a: any, b: any) => b.Hours - a.Hours);
      return newarr;
    }
    else {
      let newarr = data.sort((a: any, b: any) => a.Hours - b.Hours);
      return newarr;
    }
  }















}

