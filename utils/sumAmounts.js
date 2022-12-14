export const sumAmounts = (data) => {
  return data.reduce(
    (total, item) =>
      total + parseFloat(item.qty) * parseFloat(item.pricePerQty),
    0
  )
}
