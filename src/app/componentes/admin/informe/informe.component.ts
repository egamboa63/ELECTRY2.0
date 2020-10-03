import { Component, OnInit } from '@angular/core';

//JSPDF
import * as jspdf from "jspdf";
import * as canvas from "html2canvas";

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent implements OnInit {

  constructor() { }

  generarPDF() {
    var element = document.getElementById("informe");
    canvas.default(element).then((canvas) => {
      var imgData = canvas.toDataURL("informe/png");
      var doc = new jspdf.jsPDF();
      var imgHeight = (canvas.height * 208) / canvas.width;
      doc.addImage(imgData, 0, 0, 208, imgHeight);
      doc.save("informe.pdf");
    });
  }

  ngOnInit(): void {
  }

}
