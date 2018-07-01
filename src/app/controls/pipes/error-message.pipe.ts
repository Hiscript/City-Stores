import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "errorMessage"
})
export class ErrorMessagePipe implements PipeTransform {
  transform(obj: any): string {
    if (obj == null) {
      return "";
    }

    if (obj["required"] != null && obj["required"] === true) {
      return "[Required]";
    } else if (obj["email"] != null && obj["email"] === true) {
      return "[Invalid Email]";
    } else if (obj["pattern"] != null) {
      return "[Invalid]";
    } else if (
      obj["passwordMismatch"] != null &&
      obj["passwordMismatch"] === true
    ) {
      return "[Confirm password does not match]";
    }
  }
}
