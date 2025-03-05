class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
            let nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
            let addressRegex = /^[A-Za-z0-9\s]{4,}$/;
            let zipRegex = /^\d{6}$/;
            let phoneRegex = /^[7-9]\d{9}$/;
            let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
            if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
                throw new Error("Invalid Name! Should start with a capital and be at least 3 characters.");
            }
            if (!addressRegex.test(address) || !addressRegex.test(city) || !addressRegex.test(state)) {
                throw new Error("Invalid Address, City or State! Should have at least 4 characters.");
            }
            if (!zipRegex.test(zip)) {
                throw new Error("Invalid Zip! Should be exactly 6 digits.");
            }
            if (!phoneRegex.test(phone)) {
                throw new Error("Invalid Phone Number! Should be a 10-digit number starting with 7, 8, or 9.");
            }
            if (!emailRegex.test(email)) {
                throw new Error("Invalid Email Address!");
            }
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
class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
            if (this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName)) {
                console.log("Duplicate Contact! Cannot add.");
                return;
            }
            this.contacts.push(contact);
            console.log("Contact added successfully!");
        }
    editContact(firstName, updatedDetails) {
            let contact = this.contacts.find(c => c.firstName === firstName);
            if (!contact) {
                console.log("Contact not found!");
                return;
            }
    
            try {
                let updatedContact = new Contact(
                    updatedDetails.firstName || contact.firstName,
                    updatedDetails.lastName || contact.lastName,
                    updatedDetails.address || contact.address,
                    updatedDetails.city || contact.city,
                    updatedDetails.state || contact.state,
                    updatedDetails.zip || contact.zip,
                    updatedDetails.phone || contact.phone,
                    updatedDetails.email || contact.email
                );
    
                let index = this.contacts.indexOf(contact);
                this.contacts[index] = updatedContact;
                console.log("Contact updated successfully!");
    
            } catch (error) {
                console.error("Update failed:", error.message);
            }
        }
        deleteContact(firstName) {
            let initialLength = this.contacts.length;
            this.contacts = this.contacts.filter(c => c.firstName !== firstName);
    
            if (this.contacts.length < initialLength) {
                console.log(`Contact '${firstName}' deleted successfully!`);
            } else {
                console.log("Contact not found!");
            }
        }
        countContacts() {
            return this.contacts.reduce(count => count + 1, 0);
        }
        searchByCityOrState(city, state) {
            return this.contacts.filter(c => c.city === city || c.state === state);
        }
        viewByCityOrState() {
            let cityMap = new Map();
            let stateMap = new Map();
    
            this.contacts.forEach(contact => {
                cityMap.set(contact.city, (cityMap.get(contact.city) || []).concat(contact));
                stateMap.set(contact.state, (stateMap.get(contact.state) || []).concat(contact));
            });
    
            console.log("Persons by City:", cityMap);
            console.log("Persons by State:", stateMap);
        }
        countByCityOrState() {
            let cityCount = {};
            let stateCount = {};
    
            this.contacts.forEach(contact => {
                cityCount[contact.city] = (cityCount[contact.city] || 0) + 1;
                stateCount[contact.state] = (stateCount[contact.state] || 0) + 1;
            });
    
            console.log("Count by City:", cityCount);
            console.log("Count by State:", stateCount);
        }
        sortByName() {
            this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
        }
    displayContacts() {
        console.log("Address Book:", this.contacts);
    }
}


let addressBook = new AddressBook();
try {
    let contact1 = new Contact("Abhishek", "Kumar", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "9876543210", "Abhi7654@example.com");
    let contact2 = new Contact("Abhishe", "Kumar", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "9876543210", "Abhi7654@example.com");
    let contact3 = new Contact("Abbbhishe", "Kumar", "Piplani", "Bhopal", "Madhya Pradesh", "400001", "9876543210", "Abhi7654@example.com");

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);

    addressBook.displayContacts();
    addressBook.editContact("Abhishek", { city: "Chakia" });

    
    addressBook.displayContacts();
    addressBook.deleteContact("Abhi");
    addressBook.displayContacts();
    console.log("Total Contacts:", addressBook.countContacts());
    console.log("Searching by City Or State",addressBook.searchByCityOrState("Bhopal", "Madhya Pradesh"));
    addressBook.viewByCityOrState();
    addressBook.countByCityOrState();
    addressBook.sortByName();
    addressBook.displayContacts();
} catch (error) {
    console.error(error.message);
}

