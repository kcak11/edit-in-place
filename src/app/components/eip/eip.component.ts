import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-eip',
  templateUrl: './eip.component.html',
  styleUrls: ['./eip.component.scss']
})
export class EipComponent implements OnInit {
  @ViewChild('valueField') private _valueField: ElementRef;
  @Input() ctx: object;
  @Input() propName: string;
  @Input() label: string;
  @Input() styleClass: string;
  @Input() deferUpdate: boolean = false;
  @Input('validator') private validatorFunc: object;

  private wasInside = false;
  errorMessage: string;
  updateBtnTxt = decodeURIComponent("%E2%9C%94");
  cancelBtnTxt = decodeURIComponent("%C3%97");
  mode = 'view';
  error = false;

  constructor(private eRef: ElementRef) { }

  private checkComponentInitialization() {
    if (!this.ctx || typeof this.ctx !== "object") {
      this.error = true;
      throw new Error("\"ctx\" is a mandatory parameter & should be bound to a property of type \"object\"");
    }
    if (!this.propName || typeof this.propName !== "string") {
      this.error = true;
      throw new Error("\"propName\" is a mandatory parameter");
    }
    if (this.label && typeof this.label !== "string") {
      this.error = true;
      throw new Error("\"label\" should be of type \"string\"");
    }
    if (this.styleClass && typeof this.styleClass !== "string") {
      this.error = true;
      throw new Error("\"styleClass\" should be of type \"string\"");
    }
    if (this.deferUpdate && typeof this.deferUpdate !== "boolean") {
      this.error = true;
      throw new Error("\"[deferUpdate]\" should be bound to a property of type \"boolean\"");
    }
    if (this.validatorFunc && typeof this.validatorFunc !== "function") {
      this.error = true;
      throw new Error("\"validator\" should be bound to a property of type \"function\"");
    }
  }

  ngOnInit(): void {
    this.checkComponentInitialization();
  }


  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click', ['$event'])
  clickout(e: Event) {
    if (!this.wasInside) {
      this.doCancel(e);
    }
    this.wasInside = false;
  }

  handleKeyDown(e: Event) {
    if (e["code"] === "Enter") {
      e.preventDefault();
      this.doUpdate(e);
    }
  }

  handleInput(e: Event) {
    let val = this._valueField.nativeElement.value;
    if (this.validatorFunc && typeof this.validatorFunc === "function") {
      this.errorMessage = this.validatorFunc(val);
    }
    if (this.errorMessage) {
      return;
    }
    if (!this.deferUpdate) {
      this.doUpdate(e, true);
    };
  }

  doUpdate(e: Event, continueEditing?: boolean) {
    if (this.errorMessage) {
      return;
    }
    let val = this._valueField.nativeElement.value;
    this.ctx[this.propName] = val;
    if (!continueEditing) {
      this.viewMode();
    }
  }

  doCancel(e: Event) {
    this.viewMode();
  }

  editMode() {
    this.errorMessage = undefined;
    this.mode = 'edit';
    setTimeout(() => {
      this._valueField.nativeElement.focus();
    }, 0);
  }

  viewMode() {
    this.mode = 'view';
    if (this.validatorFunc && typeof this.validatorFunc === "function") {
      this.validatorFunc(this.ctx[this.propName]);
    }
  }
}
