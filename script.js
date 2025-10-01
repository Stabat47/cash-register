let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cashInput = document.getElementById("cash").value;
  const changeDueElement = document.getElementById("change-due");
  let cash = parseFloat(cashInput);

  if (isNaN(cash) || cash <= 0) {
    changeDueElement.textContent = "⚠️ Please enter a valid cash amount";
    return;
  }

  if (cash < price) {
    changeDueElement.textContent = "⚠️ Customer does not have enough money to purchase the item";
    return;
  }

  if (cash === price) {
    changeDueElement.textContent = "✅ No change due - exact cash";
    return;
  }

  let changeDue = parseFloat((cash - price).toFixed(2));
  let totalCid = parseFloat(cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2));

  if (changeDue > totalCid) {
    changeDueElement.textContent = "⚠️ Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeArray = [];
  let remainingCid = JSON.parse(JSON.stringify(cid)).reverse();

  for (let [unit, amount] of remainingCid) {
    let unitValue = currencyUnits[unit];
    let used = 0;

    while (changeDue >= unitValue && amount >= unitValue) {
      changeDue = parseFloat((changeDue - unitValue).toFixed(2));
      amount = parseFloat((amount - unitValue).toFixed(2));
      used = parseFloat((used + unitValue).toFixed(2));
    }

    if (used > 0) {
      changeArray.push([unit, used]);
    }
  }

  if (changeDue > 0) {
    changeDueElement.textContent = "⚠️ Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeOutput = changeArray.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" | ");

  if (parseFloat((cash - price).toFixed(2)) === totalCid) {
    changeDueElement.textContent = `✅ Status: CLOSED | ${changeOutput}`;
  } else {
    changeDueElement.textContent = `✅ Status: OPEN | ${changeOutput}`;
  }
});
