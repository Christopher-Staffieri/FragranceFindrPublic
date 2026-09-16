// import { Button } from "flowbite-react"

export default function Button (props) {
  return <button className='btn btn-primary' {...props}>{props.children}</button>
}