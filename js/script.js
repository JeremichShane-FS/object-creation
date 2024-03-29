class Student {
  constructor(name, age, sex, major) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.major = major;
  }

  getStudentBio() {
    return `${this.name.charAt(0).toUpperCase() + this.name.slice(1)} is ${this.age} years old and is studying ${this.major} as their major.`;
  }
}

class App {
  constructor() {
    this.studentData = [];
    document.getElementById("submit").addEventListener("click", e => this.add(e));
    document.getElementById("display").addEventListener("click", () => this.display());
  }

  add(e) {
    e.preventDefault();
    const formData = document.querySelectorAll("input, select");

    if (this.validateForm(formData)) {
      let success = document.getElementById("success");
      const selected = document.querySelector('input[name="sex"]:checked').value;
      const student = new Student(formData[0].value, formData[1].value, selected, formData[5].value);
      this.studentData.push(student);
      success.innerHTML = "Student added successfully!";
      formData.forEach(d => {
        d.value = "";
      });
      formData.forEach(d => {
        d.addEventListener("click", () => {
          success.innerHTML = "";
        });
      });
    } else {
      formData.forEach(d => {
        if (!d.checkValidity()) {
          d.reportValidity();
        }
      });
    }
  }

  validateForm(formData) {
    let isValid = true;
    formData.forEach(d => {
      if (!d.checkValidity()) {
        isValid = false;
      }
    });
    return isValid;
  }

  display() {
    let results = document.getElementById("results");
    results.innerHTML = "";
    this.studentData.forEach(student => {
      let name = student.name.charAt(0).toUpperCase() + student.name.slice(1);
      let sex = student.sex.charAt(0).toUpperCase() + student.sex.slice(1);

      results.innerHTML += `
          <div class="student">
            <h2>Name: ${name}</h2>
            <p>Age:${student.age}</p>
            <p>${sex}</p>
            <p>Major: ${student.major}</p>

            <p>${student.getStudentBio()}</p>
            <p>Date entered: ${Utility.getToday()}</p>
            </div>
            `;
    });
  }
}

(() => {
  const app = new App();
})();
