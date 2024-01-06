abstract class House {
  door: boolean = false;
  key: Key;
  tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  abstract openDoor(enteredKey: Key): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`${person.getKey().getSignature()} entered the house.`);
    } else {
      console.log("The door is closed.");
    }
  }
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  openDoor(enteredKey: Key): void {
    if (enteredKey.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("The door is now open.");
    } else {
      console.log("Invalid key.");
    }
  }
}

class Key {
  private signature: string;

  constructor() {
    this.signature = this.generateRandomSignature();
  }

  private generateRandomSignature(): string {
    return Math.random().toString(36).substring(2);
  }

  getSignature(): string {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

const keyForMyHouse = new Key();
const myHouse = new MyHouse(keyForMyHouse);

myHouse.openDoor(keyForMyHouse);
const personWithValidKey = new Person(keyForMyHouse);
myHouse.comeIn(personWithValidKey);

const anotherKey = new Key();
myHouse.openDoor(anotherKey);
const personWithInvalidKey = new Person(anotherKey);
myHouse.comeIn(personWithInvalidKey);

export {};
