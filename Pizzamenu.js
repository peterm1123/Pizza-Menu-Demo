var myForm = document.forms['pizzaForm']

		function getRadioSelect(form, name) {
			// get list of radio buttons with specified name
			var radios = form.elements[name];
			// loop through list of radio buttons
			for (var rNum=0; rNum<radios.length; rNum++) {
				if ( radios[rNum].checked ) { // radio checked?
				break; // and break out of for loop
				}
			}
			return rNum; // return value (string datatype) of checked radio or undefined if none checked
		}


		function getRadioVal(form, name) {
			var val;
			// get list of radio buttons with specified name
			var radios = form.elements[name];
			// loop through list of radio buttons
			for (var rNum=0; rNum<radios.length; rNum++) {
				if ( radios[rNum].checked ) { // radio checked?
					val = radios[rNum].value; // if so, hold its value in val
					break; // and break out of for loop
				}
			}
			return val; // return value (string datatype) of checked radio or undefined if none checked
		}

		//Checkbox values are called by class grouping of the inputs.
		 
		function getCheckboxVal(classname) {
			var checkboxes = []; //array will contain all checkboxes
			var checked = []; //array will contain all checked checkboxes
			var checks = document.getElementsByClassName(classname);
			// loop through list of checkboxes
			for (var cNum=0; cNum<checks.length; cNum++) {
				if (checks[cNum].type == "checkbox") { //redundant piece of code that I included as I see future use for it in this function. 
					checkboxes.push(checks[cNum]);
					if (checks[cNum].checked) { // checkbox checked?
					checked.push(checks[cNum].value);//Adds checked checkbox values (Topping names in this case) into an array.
					}
				}
			}
			return checked; //return array of checked checkboxes or undefined if none checked.
		}



		function getCheckboxPrice (classname) { 
			var checked = getCheckboxVal(classname);
				var checkCount = checked.length;//Price of a topping is conveniently 1, the same unit for array enumeration.
					if (checkCount > 1) {
					checkCount = (checkCount - 1);//First topping is free.
					} else {
					checkCount = 0;
					}
			return formatDecimal(checkCount); //return total (integer datatype) of checked checkboxes and string to include two decimal values.
		}


		// format val to n number of decimal places
		function formatDecimal(val, n) {
			n = n || 2;
				var str = "" + Math.round ( parseFloat(val) * Math.pow(10, n) );
				while (str.length <= n) {
					str = "0" + str;
				}
				var pt = str.length - n;
			return str.slice(0,pt) + "." + str.slice(pt);
		}
			

			
		function SizeSelect () {
			var sizeSelectArray = ["Personal", "Medium", "Large", "Extra Large" ];
			var val = "Pizza Size: " + sizeSelectArray[getRadioSelect(myForm , 'size' )]; 
		return(val);	
		}

		function SizePrice () {
			var val = getRadioVal(myForm , 'size' );
		return(val);	
		}


		function CrustSelect () {
			var crustSelectArray = ["Plain", "Garlic Butter", "Spicy", "House Special", "Cheese Stuffed" ];
			var val = "Crust: " + crustSelectArray[getRadioSelect(myForm , 'crust' )];
		return(val);	
		}

		function CrustPrice () {
			var val = getRadioVal(myForm , 'crust' );
		return(val);	
		}


		function SauceSelect () {
			var sauceSelectArray = ["Marinara", "White", "Barbeque", "NO Sauce" ];
			var val = "Sauce: " + sauceSelectArray[getRadioSelect(myForm , 'sauce' )];
		return(val);	
		}

		function SaucePrice () {
			var val = getRadioVal(myForm , 'sauce' );
		return(val);	
		}


		function CheeseSelect () {
			var cheeseSelectArray = ["Regular", "NO Cheese", "EXTRA Cheese" ];
			var val = "Cheese: " + cheeseSelectArray[getRadioSelect(myForm , 'cheese' )];
		return(val);	
		}

		function CheesePrice () {
			var val = getRadioVal(myForm , 'cheese' );
		return(val);	
		}


		/* Checkbox button selctions are assesed by using the HTML group's class. 
		and calling their input values.*/


		function MeatSelect () {
				var val = "Meat Toppings: " + getCheckboxVal( 'meat' ); 
		return val;	
		}


		function MeatPrice () {
			var val = getCheckboxPrice('meat');
		return(val);	
		}


		function VeggieSelect () {
				var val = "Vegetarian Toppings: " + getCheckboxVal( 'veggie' ); 
		return val;	
		}


		function VeggiePrice () {
			var val = getCheckboxPrice('veggie');
		return val;
		}

		function GetPrice () {
			var price = 0;
			price += parseFloat(SizePrice ());
			price += parseFloat(CrustPrice ());
			price += parseFloat(SaucePrice ());
			price += parseFloat(CheesePrice ());
			price += parseFloat(MeatPrice ());
			price += parseFloat(VeggiePrice ());
		  return formatDecimal(price);
		}

		function GetReceipt () {
			document.getElementById("ordertitle").innerHTML = "Order Summary";
			document.getElementById("Size").innerHTML = SizeSelect ();
			document.getElementById("SizePrice").innerHTML = "     "+ SizePrice ();
			document.getElementById("Crust").innerHTML = CrustSelect ();
			document.getElementById("CrustPrice").innerHTML = " + " + CrustPrice ();
			document.getElementById("Sauce").innerHTML = SauceSelect ();
			document.getElementById("SaucePrice").innerHTML = " + " + SaucePrice ();
			document.getElementById("Cheese").innerHTML = CheeseSelect ();
			document.getElementById("CheesePrice").innerHTML = " + " + CheesePrice ();
			document.getElementById("Meats").innerHTML = MeatSelect ();
			document.getElementById("MeatPrice").innerHTML = " + " + MeatPrice ();
			document.getElementById("Veggies").innerHTML = VeggieSelect ();
			document.getElementById("VeggiesPrice").innerHTML = " + " + VeggiePrice ();
			document.getElementById("Total").innerHTML = "Total";
			document.getElementById("TotalPrice").innerHTML = "$" + GetPrice ();
		}

		function OrderCheck () {
			var val = GetPrice ();
			if (isNaN(val)) {
				document.getElementById("ordertitle").innerHTML = "Please Complete the selection by submitting all relevant menu form options. Thank you.";
			} else {
				val = GetReceipt ();
			}
		return val;
		}