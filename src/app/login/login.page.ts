import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

export class Booking {
	siteid: string
	visitTime: string
	visitDate: string
	partySize:string
	promo_code:string
	channel_code:string
	promotionid: number
	IsLeaveTimeConfirmed: boolean

	constructor(siteid: string, visitTime: string, visitDate: string, partySize: string, promo_code: string, channel_code: string, promotionid: number, IsLeaveTimeConfirmed: boolean) {
        this.siteid = siteid;
		this.partySize = partySize;
		this.visitTime = visitTime;
		this.visitDate = visitDate;
		this.promo_code = promo_code;
		this.channel_code = channel_code;
		this.promotionid = promotionid;
		this.IsLeaveTimeConfirmed = IsLeaveTimeConfirmed;
    }
}

export interface TimeList {
	isleavetimerequired: boolean
	leavetime: string
	timeslot: string
}

export interface Promotion {
	ID: number
	DESC: string
	REQUIRECREDITCARDMSG: string
	MAYREQUIRECREDITCARD: boolean
	NAME: string
}

export interface Venue {
	location: string
	site: string
	site_id: number
	siteid: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('venueLists', { static: true }) selectRefVenue: IonSelect;
  @ViewChild('partyLists', { static: true }) selectRefParty: IonSelect;
  @ViewChild('visitLists', { static: true }) selectRefVisit: IonSelect;

  public bookingForm:FormGroup;	
  public venueList = new Array<Number>();
  public partSizeList = new Array<Number>();
  public visitTimeList = new Array<Number>();
  formCtrlSub = new Subscription();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

  	this.bookingForm = this.formBuilder.group({
        siteid: new FormControl({value:'',disabled:false}, Validators.compose([Validators.required])),
        partySize: new FormControl({value:'',disabled:true}, Validators.compose([Validators.required])),
        visitTime: new FormControl({value:'',disabled:true}, Validators.compose([Validators.required]))
    });
    this.venueList = [1,2,3,4,5];
    
    this.visitTimeList = [21,22,23,24,25];
  }  

  searchTimeAvailability(type){
  	if(type == 1){ 
   		this.partSizeList = [11,12,13,14,15];
   		this.visitTimeList = [21,22,23,24,25];
   		this.bookingForm.get('partySize').enable();
      this.bookingForm.get('partySize').setValue(14,{emitEvent: false});

   		
   	}else if(type == 2){
   		this.visitTimeList = [31,32,33,34,35];
   		this.bookingForm.get('visitTime').enable();
      this.bookingForm.get('visitTime').setValue(34,{emitEvent: false});
   	}else if(type == 3){
   	
   	}	
  }

  selectOption(e:any, type: number){
    console.log(e);
    if(e.detail.value != '' && e.detail.value != undefined){
    	console.log('selectOption = '+ type);
      if(type == 1){       
          this.bookingForm.get('visitTime').setValue('');
          this.bookingForm.get('visitTime').disable();

          this.bookingForm.get('partySize').setValue('');
          this.bookingForm.get('partySize').disable();
      	  this.searchTimeAvailability(type); 
      	  return false;	
      }else if(type == 2){
          this.bookingForm.get('visitTime').setValue('');
          this.bookingForm.get('visitTime').disable();
          this.searchTimeAvailability(type); 
      }else if(type == 3){
          this.searchTimeAvailability(type);

      }
    }    
  }


}
