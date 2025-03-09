const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

const isPalindrome = (s) => {
   // return s === s.split('').reverse().join(''); // one line solution

   // Removes all non-alphanumeric characters
   s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

   for (let i = 0, j = s.length - 1; i < j; i++, j--) {
      if (s.charAt(i) !== s.charAt(j)) return false;
   }

   return true;
};

checkBtn.addEventListener("click", () => {
   result.innerText = "";

   const s = document.getElementById("text-input").value.trim(); // covers entering " " only

   if (s === "") {
      alert("Please input a value");
   } else if (isPalindrome(s)) {
      result.innerText = `${s} is a palindrome`;
   } else {
      result.innerText = `${s} is not a palindrome`;
   }
});