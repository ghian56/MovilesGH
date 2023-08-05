import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})

export class CalendarioPage {
  feriados = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();
  constructor(private db: AngularFirestore,
  ) {
   
    
    const feriado1 = {
      title: 'Año nuevo',
      startTime: new Date('2023/01/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/01/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado2 = {
      title: 'Jueves Santo',
      startTime: new Date('2023/04/06'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/04/06'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado3 = {
      title: 'Viernes Santo',
      startTime: new Date('2023/04/07'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/04/07'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado4 = {
      title: 'Dia del Trabajo',
      startTime: new Date('2023/05/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/05/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado5 = {
      title: 'San Pedro y San Pablo',
      startTime: new Date('2023/06/29'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/06/29'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado6 = {
      title: 'Dia de la Fuerza Área del Perú',
      startTime: new Date('2023/07/23'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/07/23'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado7 = {
      title: 'Día de la Independencia',
      startTime: new Date('2023/07/28'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/07/28'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado8 = {
      title: 'Celebración del Dia de la Independencia',
      startTime: new Date('2023/07/29'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/07/29'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado9 = {
      title: 'Batalla de Junín',
      startTime: new Date('2023/08/06'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/08/06'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado10 = {
      title: 'Santa Rosa de Lima',
      startTime: new Date('2023/08/30'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/08/30'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado11 = {
      title: 'Combate de Angamos',
      startTime: new Date('2023/10/08'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/10/08'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado12 = {
      title: 'Dia de todos los Santos',
      startTime: new Date('2023/11/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/11/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado13 = {
      title: 'Inmaculada Concepción',
      startTime: new Date('2023/12/08'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/12/08'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado14 = {
      title: 'Batalla de Ayacucho',
      startTime: new Date('2023/12/09'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/12/09'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado15 = {
      title: 'Navidad',
      startTime: new Date('2023/12/25'), // Fecha y hora de inicio del feriado
      endTime: new Date('2023/12/25'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado16 = {
      title: 'Año nuevo',
      startTime: new Date('2024/01/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/01/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado17 = {
      title: 'Jueves Santo',
      startTime: new Date('2024/04/06'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/04/06'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado18 = {
      title: 'Viernes Santo',
      startTime: new Date('2024/04/07'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/04/07'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado19 = {
      title: 'Dia del Trabajo',
      startTime: new Date('2024/05/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/05/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado20 = {
      title: 'San Pedro y San Pablo',
      startTime: new Date('2024/06/29'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/06/29'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado21 = {
      title: 'Dia de la Fuerza Área del Perú',
      startTime: new Date('2024/07/23'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/07/23'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado22 = {
      title: 'Día de la Independencia',
      startTime: new Date('2024/07/28'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/07/28'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado23 = {
      title: 'Celebración del Dia de la Independencia',
      startTime: new Date('2024/07/29'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/07/29'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado24 = {
      title: 'Batalla de Junín',
      startTime: new Date('2024/08/06'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/08/06'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado25 = {
      title: 'Santa Rosa de Lima',
      startTime: new Date('2024/08/30'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/08/30'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado26 = {
      title: 'Combate de Angamos',
      startTime: new Date('2024/10/08'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/10/08'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado27 = {
      title: 'Dia de todos los Santos',
      startTime: new Date('2024/11/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/11/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado28 = {
      title: 'Inmaculada Concepción',
      startTime: new Date('2024/12/08'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/12/08'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado29 = {
      title: 'Batalla de Ayacucho',
      startTime: new Date('2024/12/09'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/12/09'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado30 = {
      title: 'Navidad',
      startTime: new Date('2024/12/25'), // Fecha y hora de inicio del feriado
      endTime: new Date('2024/12/25'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado31 = {
      title: 'Año nuevo',
      startTime: new Date('2025/01/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/01/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado32 = {
      title: 'Jueves Santo',
      startTime: new Date('2025/04/06'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/04/06'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado33 = {
      title: 'Viernes Santo',
      startTime: new Date('2025/04/07'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/04/07'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado34 = {
      title: 'Dia del Trabajo',
      startTime: new Date('2025/05/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/05/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado35 = {
      title: 'San Pedro y San Pablo',
      startTime: new Date('2025/06/29'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/06/29'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado36 = {
      title: 'Dia de la Fuerza Área del Perú',
      startTime: new Date('2025/07/23'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/07/23'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado37 = {
      title: 'Día de la Independencia',
      startTime: new Date('2025/07/28'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/07/28'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado38 = {
      title: 'Celebración del Dia de la Independencia',
      startTime: new Date('2025/07/29'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/07/29'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado39 = {
      title: 'Batalla de Junín',
      startTime: new Date('2025/08/06'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/08/06'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado40 = {
      title: 'Santa Rosa de Lima',
      startTime: new Date('2025/08/30'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/08/30'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado41 = {
      title: 'Combate de Angamos',
      startTime: new Date('2025/10/08'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/10/08'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado42 = {
      title: 'Dia de todos los Santos',
      startTime: new Date('2025/11/01'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/11/01'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado43 = {
      title: 'Inmaculada Concepción',
      startTime: new Date('2025/12/08'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/12/08'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado44 = {
      title: 'Batalla de Ayacucho',
      startTime: new Date('2025/12/09'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/12/09'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    const feriado45 = {
      title: 'Navidad',
      startTime: new Date('2025/12/25'), // Fecha y hora de inicio del feriado
      endTime: new Date('2025/12/25'),   // Fecha y hora de finalización del feriado
      allDay: true,                     // Indica si el feriado dura todo el día o tiene una hora específica
    };

    // Agregar los feriados a la variable 'feriados'
    this.feriados.push(feriado1);
    this.feriados.push(feriado2);
    this.feriados.push(feriado3);
    this.feriados.push(feriado4);
    this.feriados.push(feriado5);
    this.feriados.push(feriado6);
    this.feriados.push(feriado7);
    this.feriados.push(feriado8);
    this.feriados.push(feriado9);
    this.feriados.push(feriado10);
    this.feriados.push(feriado11);
    this.feriados.push(feriado12);
    this.feriados.push(feriado13);
    this.feriados.push(feriado14);
    this.feriados.push(feriado15);
    this.feriados.push(feriado16);
    this.feriados.push(feriado17);
    this.feriados.push(feriado18);
    this.feriados.push(feriado19);
    this.feriados.push(feriado20);
    this.feriados.push(feriado21);
    this.feriados.push(feriado22);
    this.feriados.push(feriado23);
    this.feriados.push(feriado24);
    this.feriados.push(feriado25);
    this.feriados.push(feriado26);
    this.feriados.push(feriado27);
    this.feriados.push(feriado28);
    this.feriados.push(feriado29);
    this.feriados.push(feriado30);
    this.feriados.push(feriado31);
    this.feriados.push(feriado32);
    this.feriados.push(feriado33);
    this.feriados.push(feriado34);
    this.feriados.push(feriado35);
    this.feriados.push(feriado36);
    this.feriados.push(feriado37);
    this.feriados.push(feriado38);
    this.feriados.push(feriado39);
    this.feriados.push(feriado40);
    this.feriados.push(feriado41);
    this.feriados.push(feriado42);
    this.feriados.push(feriado43);
    this.feriados.push(feriado44);
    this.feriados.push(feriado45);


    this.db.collection(`feriados`).snapshotChanges().subscribe(colSnap => {
      this.feriados = [];
      console.log(this.feriados = [])
      colSnap.forEach(snap => {
        let feriado: any = snap.payload.doc.data();
        feriado.id = snap.payload.doc.id;
        feriado.startTime = feriado.startTime.toDate();
        feriado.endTime = feriado.endTime.toDate();
        console.log(feriado);
        this.feriados.push(feriado);
      });
    });
    
  }


  addNewEvent() {
    let start = this.selectedDate;
    let end = this.selectedDate;
    end.setMinutes(end.getMinutes() + 60);

    let event = {
      title: 'Event #' + start.getMinutes(),
      startTime: start,
      endTime: end,
      allDay: false,

    };

    this.db.collection(`events`).add(event);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }



  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  formatTitle(date: Date): string {
    // Utiliza la biblioteca 'moment.js' para formatear la fecha en el formato deseado
    return moment(date).format('MMMM YYYY');
  }
  getFormattedDate(date: Date): string {
    moment.locale('es');
    return moment(date).format('MMMM YYYY');
  }

  // Método para actualizar la fecha actual del calendario cuando cambias de mes
  onCurrentDateChanged(event: Date) {
    this.calendar.currentDate = event;
  }

}