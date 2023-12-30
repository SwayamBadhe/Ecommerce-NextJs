import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assests/logo.png';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';

async function searchProducts(formData: FormData) {
  'use server';

  const searchQuery = formData.get('searchQuery')?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

const Navbar = async () => {
  const cart = await getCart();

  return (
    <div className="bg-base-100 ">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case ">
            <Image src={logo} height={40} width={40} alt="Amazon Clone logo" />
            Amazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <form action={searchProducts} className="form-control">
            <input
              name="searchQuery"
              placeholder="Search"
              className="input input-bordered w-full min-width-[100px]"
            />
          </form>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
