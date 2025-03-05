class Contact {
        constructor(firstName, lastName, address, city, state, zip, phone, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.phone = phone;
            this.email = email;
        }
    }
    
   
    let contact1 = new Contact("Abhishek", "Kumar", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "9876543210", "Abhi7654@example.com");
    console.log("Contact Created:", contact1);
    