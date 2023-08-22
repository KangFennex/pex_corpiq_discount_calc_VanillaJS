const menuIcon = document.querySelector("#menu-icon");
const menuIconClose = document.querySelector("#menu-icon-close");
const menu = document.querySelector("#menu");
const textarea = document.querySelectorAll(".textarea");
const costMembership = document.querySelector(".prix-forfait");
const membershipDiscount = document.querySelector(".prix-forfait-rabais");
const membershipDiscountSidebar = document.querySelector(
  ".prix-forfait-rabais-sidebar"
);
const doors = document.querySelector(".number-doors");
const rateRental = document.querySelector(".percentage-rental");
const needs = document.querySelector(".besoins-enquetes-baux");
const screeningsReg = document.querySelector(".screeningsRegPrice");
const screeningsRed = document.querySelector(".screeningsRedPrice");
const screeningsDis = document.querySelector(".screeningsDiscount");
const screeningsDisSidebar = document.querySelector(
  ".screeningsDiscount-sidebar"
);
const leasesReg = document.querySelector(".leasesRegPrice");
const leasesRed = document.querySelector(".leasesRedPrice");
const leasesDis = document.querySelector(".leasesDiscount");
const leasesDisSidebar = document.querySelector(".leasesDiscountSidebar");
const totalSavings = document.querySelector(".totalSavings");
const costMembers = document.querySelector(".prix-membre");
const costNonMembers = document.querySelector(".prix-nonMembre");

let totalNeeds;
let discount;
let cost;
let total;

// textarea.focus();

// Function to toggle the menu

menuIcon.addEventListener("click", () => {
  menuIcon.style.display = "none";
  menuIconClose.style.display = "flex";
  menu.style.display = "flex";
});
menuIconClose.addEventListener("click", () => {
  menuIconClose.style.display = "none";
  menuIcon.style.display = "flex";
  menu.style.display = "none";
});

// Function to calculate the prices of screening and leases according to the data found in calculateNeeds()
const calculatePrices = (quantity, priceMember, priceNonMember) => {
  const regPrice = (quantity * priceNonMember).toFixed(2);
  const redPrice = (quantity * priceMember).toFixed(2);
  const savings = (regPrice - redPrice).toFixed(2);
  return { regPrice, redPrice, savings };
};

// Function to calculate the discount according to the user input of the membership price
const calculateDiscount = (input) => {
  cost = parseFloat(input);
  discount = (input * 0.1).toFixed(2);
  total = (cost - discount).toFixed(2);
  totalTaxed = (total * 1.14975).toFixed(2);

  if (cost) {
    membershipDiscount.innerHTML = `Rabais: ${discount} $<br> Total: ${total}<br>Avec taxes: ${totalTaxed} $`;

    // Make the membership discount amount appear on the sidebar
    membershipDiscountSidebar.innerHTML = `${discount} $`;
  } else {
    membershipDiscount.innerHTML = `Rabais: 0.00 $$<br> Total: 0.00 $<br>Avec taxes: 0.00 $`;

    // Put the membership discount amount appear on the sidebar
    membershipDiscountSidebar.innerHTML = `0.00 $`;
  }
};

// Function to calculate the user's needs in screenings and leases as well as the corresponding discounts
const calculateNeeds = (doorsNum, rate) => {
  const doorsValue = parseFloat(doorsNum);
  const rateValue = parseFloat(rate);

  if (doors && rate) {
    const ratePercentile = rateValue / 100;
    const totalNeeds = Math.ceil(doorsValue * ratePercentile);

    // Prices data
    const basicScreeningPrices = calculatePrices(totalNeeds, 12.99, 24.99);
    const indeptScreeningPrices = calculatePrices(totalNeeds, 47.99, 74.9);
    const leasePrices = calculatePrices(totalNeeds, 4.97, 8.29);

    // Calculate the cost of (1) membership + (2) screenings + (3) leases for members vs non-members

    // For non-members
    const totalCostNonMembers = (
      Number(cost) +
      Number(indeptScreeningPrices.regPrice) +
      Number(leasePrices.regPrice)
    ).toFixed(2);

    // For members
    const totalCostMembers = (
      Number(total) +
      Number(indeptScreeningPrices.redPrice) +
      Number(leasePrices.redPrice)
    ).toFixed(2);

    // Calculate the total discount for the sidebar
    const calculatedTotalSavings = (
      Number(discount) +
      Number(indeptScreeningPrices.savings) +
      Number(leasePrices.savings)
    ).toFixed(2);

    // Input the cost of 1, 2, and 3 for non-members
    costNonMembers.innerHTML = `${totalCostNonMembers} $`;

    // Input the cost of 1, 2, and 3 for members
    costMembers.innerHTML = `${totalCostMembers} $`;

    // Input the needs on the first board
    needs.innerHTML = `Enquêtes: ${totalNeeds}<br>Baux: ${totalNeeds}`;

    // Input the screenings' prices and discounts on the second board according to the user needs
    screeningsReg.innerHTML = `Basique: ${basicScreeningPrices.regPrice} $<br>Approfondie: ${indeptScreeningPrices.regPrice} $`;
    screeningsRed.innerHTML = `Basique: ${basicScreeningPrices.redPrice} $<br>Approfondie: ${indeptScreeningPrices.redPrice} $`;
    screeningsDis.innerHTML = `Basique: ${basicScreeningPrices.savings} $<br>Approfondie: ${indeptScreeningPrices.savings} $`;

    // Put the discount amount (inDept screenings) on the sidebar
    screeningsDisSidebar.innerHTML = `${indeptScreeningPrices.savings} $`;

    // Input the leases' prices and discounts on the second board according to the user needs
    leasesReg.innerHTML = `${leasePrices.regPrice} $`;
    leasesRed.innerHTML = `${leasePrices.redPrice} $`;
    leasesDis.innerHTML = `${leasePrices.savings} $`;

    // Put the discount amount (leases) on the sidebar
    leasesDisSidebar.innerHTML = `${leasePrices.savings} $`;

    // Put the total discount on the sidebar
    totalSavings.innerHTML = `${calculatedTotalSavings} $`;
  } else {
    needs.innerHTML = `Enquêtes: 0<br>Baux: 0`;
    screeningsReg.innerHTML = `Basique: 0.00 $<br>Approfondie: 0.00 $`;
    screeningsRed.innerHTML = `Basique: 0.00 $<br>Approfondie: 0.00 $`;
    screeningsDis.innerHTML = `Basique: 0.00 $<br>Approfondie: 0.00 $`;
    leasesDis.innerHTML = `0.00 $`;
    screeningsDisSidebar.innerHTML = `0.00 $`;
    leasesDisSidebar.innerHTML = `0.00 $`;
    costNonMembers.innerHTML = `0.00 $`;
    totalCostMembers.innerHTML = `0.00 $`;
  }
};

const updateNeeds = () => {
  calculateNeeds(doors.value, rateRental.value);
};

costMembership.addEventListener("input", (e) => {
  calculateDiscount(e.target.value);
});

doors.addEventListener("input", updateNeeds);
rateRental.addEventListener("input", updateNeeds);
