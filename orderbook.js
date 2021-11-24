const reconcileOrder = (existingBook, incomingOrder) => {

  // TEST 1: if existingBook is empty, push the incomingOrder into the array
  if (existingBook.length === 0) {
    existingBook.push(incomingOrder);
    return existingBook;
  } 

  // TEST 2 & 3: if existingBook has only one object, push the incomingOrder into the array
  if (existingBook.length === 1) {
    existingBook.push(incomingOrder);
    return existingBook;
  }

  // FOR ALL OTHER TESTS: Loop through existingBook array
  for (let i = 0; i < existingBook.length; i++) {

    // FOR tests 7-9: if the current order type and following order type are the same AND their type is different from incomingOrder's type
    if (existingBook[i].type === existingBook[i + 1].type && existingBook[i].type !== incomingOrder.type) {

      // TEST 7: if the current order quantity and following order quantity in existingBook are EQUAL TO incomingOrder's quantity
      if (existingBook[i].quantity + existingBook[i + 1].quantity === incomingOrder.quantity) {
        // splice out the current and following order from existingBook
        existingBook.splice(i, 2);
        return existingBook;
      }

      // TEST 8: if the current order quantity and following order quantity in existingBook are GREATER THAN incomingOrder's quantity
      if ((existingBook[i].quantity + existingBook[i + 1].quantity) > incomingOrder.quantity) {
        // re-assign incomingOrder's type to the current order's type
        incomingOrder.type = existingBook[i].type;
        // re-assign incomingOrder's quantity to the difference between (current order + following order quantities) and incominOrder's quantity
        incomingOrder.quantity = (existingBook[i].quantity + existingBook[i + 1].quantity) - incomingOrder.quantity;
        // push the changed incomingOrder into existingBook
        existingBook.push(incomingOrder);
        // splice out the current and following order from existingBook
        existingBook.splice(i, 2);
        return existingBook;
      }

      // TEST 9: if the current order quantity and following order quantity in existingBook are GREATER THAN incomingOrder's quantity
      if ((existingBook[i].quantity + existingBook[i + 1].quantity) < incomingOrder.quantity) {
        // re-assign incomingOrder's quantity to the difference between incominOrder's quantity and (current order + following order quantities)
        incomingOrder.quantity = incomingOrder.quantity - (existingBook[i].quantity + existingBook[i + 1].quantity);
        // push the changed incomingOrder into existingBook
        existingBook.push(incomingOrder);
        // splice out the current and following order from existingBook
        existingBook.splice(i, 2);
        return existingBook;
      }
    }

    // FOR tests 4-6: if the above condition isn't met (order[i].type !== order[i + 1].type) and the current order's type is NOT equal to incomingOrder's type
    if (existingBook[i].type !== incomingOrder.type) {

      // TEST 4: if current order's quantity is EQUAL TO incomingOrder's quantity
      if (existingBook[i].quantity === incomingOrder.quantity) {
        // splice out current order
        existingBook.splice(i, 1);
        return existingBook;
      } 

      // TEST 5: if current order's quantity is GREATER THAN incomingOrder's quantity
      if (existingBook[i].quantity > incomingOrder.quantity) {
        // re-assign incomingOrder's type to the current order's type
        incomingOrder.type = existingBook[i].type;
        // re-assign incomingOrder's quantity to the difference between currentOrder's quantity and incomingOrder's quantity
        incomingOrder.quantity = existingBook[i].quantity - incomingOrder.quantity;
        // push the changed incomingOrder into existingBook
        existingBook.push(incomingOrder);
        // splice out current order
        existingBook.splice(i, 1);
        return existingBook;
      }

      // TEST 6: if current order's quantity is LESS THAN incomingOrder's quantity
      if (existingBook[i].quantity < incomingOrder.quantity) {
        // re-assign incomingOrder's quantity to the difference between incomingOrder's quantity and  currentOrder's quantity
        incomingOrder.quantity =  incomingOrder.quantity - existingBook[i].quantity;
        // push the changed incomingOrder into existingBook
        existingBook.push(incomingOrder);
        // splice out current order
        existingBook.splice(i, 1);
        return existingBook;
      }
    }
  }
}
  

module.exports = reconcileOrder