import NavBar from "../components/NavBar"
import { useContext } from "react"
import { UserContext } from "../Context/UserContext"

function MyCart() {
  const dummyCart = [
    {
      product: "Harry Potter And the Sorcerer's Stone",
      quantity: 1,
      price: 15,
      total: 15,
    },
    {
      product: "The Hunger Games",
      quantity: 1,
      price: 12,
      total: 12,
    },
  ]

  return (
    <div className="flex flex-col w-full min-h-screen bg-right">
      <NavBar />
      <section className="mx-10 my-5 flex flex-col gap-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl font-bold">My Cart</h1>
          <button className="bg-red-400 font-semibold text-xl px-4 py-2 rounded-2xl text-white shadow-lg cursor-pointer">
            Checkout
          </button>
        </div>
        <table className="w-full table-auto text-center">
          <thead>
            <tr className="border-b">
              <th className="text-xl py-2">Product</th>
              <th className="text-xl">Quantity</th>
              <th className="text-xl">Price</th>
              <th className="text-xl">Total</th>
            </tr>
          </thead>
          <tbody>
            {dummyCart?.map(({ product, quantity, price, total }, index) => (
              <tr key={index} className="border-b">
                <td className="text-lg py-2">{product}</td>
                <td className="text-lg">{quantity}</td>
                <td className="text-lg">${price}</td>
                <td className="text-lg">${total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <h2 className="text-2xl font-semibold">Total: $27</h2>
        </div>
      </section>
    </div>
  )
}

export default MyCart
