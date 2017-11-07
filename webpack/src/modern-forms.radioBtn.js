class mskinRadiobox extends mskinCheckbox {
	constructor( targetElement ) {
		super( targetElement, true );
		
		this.htmlElement["radioChilds"] = [
			this.targetElement.querySelectorAll("p") ];
	}
}