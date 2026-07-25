import Link from 'next/link'
export default function page() {
  return (
    <div>Landing page
      <Link href={"/login"}>login</Link>
    </div>
  )
}
