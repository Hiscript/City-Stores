import { Component, AfterViewInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ControlBase } from "../control-base";
import { AppSettings } from "../../app.settings";

@Component({
  selector: "phone-control",
  templateUrl: "./phone-control.component.html"
})
export class PhoneControlComponent extends ControlBase
  implements AfterViewInit {
  phonePrefix: string = AppSettings.Phone_Prefix;
  phonePattern: string = AppSettings.Phone_Pattern;

  ngAfterViewInit() {
    if (this.required) {
      this.control.setValidators([
        Validators.required,
        Validators.pattern(this.phonePattern)
      ]);
    } else {
      this.control.setValidators([Validators.pattern(this.phonePattern)]);
    }
  }
}
