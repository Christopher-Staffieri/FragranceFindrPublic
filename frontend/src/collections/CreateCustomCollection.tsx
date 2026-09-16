import {
    Button,
    Label,
    Modal,
    Select,
    TextInput,
    Textarea,
  } from "flowbite-react";
// import { use } from "framer-motion/client";
import { useState } from "react";
import { HiPlus, HiX } from "react-icons/hi";
import { postUserCustomCollection } from "../lib/allauth";
import { useUser } from "../auth";
export default function CreateCustomCollection({currentState, count, refreshData}){
    const [showModal, setShowModal] = useState(false)
    const [collectionName, setCollectionName] = useState(null)
    const [description, setDescription] = useState(null)
    const [collectionIcon, setCollectionIcon] = useState(null)
    const [collectionCount, setCollectionCount] = useState(count)
    const user = useUser()
    console.log(user)
    const submitCollection = () => {
        if (collectionName === null){
            // setCollectionName(`New Collection #${collectionCount + 1}`)
            postUserCustomCollection({collection_name: `New Collection #${collectionCount + 1}`, description: description, collection_icon: collectionIcon, perfumes: [], user_collection: user.user_collection}).then((resp) => {
                console.log(resp)
                // Here the error is thrown when the perfume isnt in the users collection already
                if (resp.error){
                    // Call the put request to add the perfume to the users collection with the selected field/category
                    // user, perfume, field, field_status
                   console.log('error')
                }else{
                    console.log(resp)
                    // Should prob refresh data here 
                    // setCollectionCount(collectionCount + 1)
                    setShowModal(false)
                    refreshData(true)
                    // setChosenPerfume(null)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
            })
        }else{
            postUserCustomCollection({collection_name: collectionName, description: description, collection_icon: collectionIcon, perfumes:[], user_collection: user.user_collection}).then((resp) => {
                console.log(resp)
                // Here the error is thrown when the perfume isnt in the users collection already
                if (resp.error){
                    // Call the put request to add the perfume to the users collection with the selected field/category
                    // user, perfume, field, field_status
                   console.log('error')
                }else{
                    console.log(resp)
                    // Should prob refresh data here 
                    // setCollectionCount(collectionCount + 1)
                    refreshData(true)
                    // setChosenPerfume(null)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
            })
        }
        
    }

    
    
    return(
        <section>
            <div className="m-5 flex justify-center">
                <Button onClick={() => setShowModal(true)}>Create product</Button>
            </div>
        <Modal onClose={() => setShowModal(false)} show={showModal}>
            <Modal.Body className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
                </h3>
                <button
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-[18px] ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                <HiX className="h-5 w-5" />
                <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form action="#">
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                    <Label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Collection Name
                    </Label>
                    <TextInput
                    id="name"
                    name="name"
                    placeholder="Type Collection Name"
                    required
                    onChange={(name) => {setCollectionName(name.target.value)}}
                    />
                </div>
                <div>
                    <Label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Description
                    </Label>
                    <TextInput
                    id="description"
                    name="description"
                    placeholder="Collection Description"
                    onChange={(description) => {setDescription(description.target.value)}}
                    />
                </div>
                
                <div>
                    <Label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Category
                    </Label>
                    <Select id="category">
                    <option selected>📁</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                    </Select>
                </div>
                
                </div>
                <Button onClick={() => submitCollection()} size="lg" className="[&>span]:text-sm">
                <HiPlus className="-ml-1 mr-2 h-4 w-4" />
                Add new product
                </Button>
            </form>
            </Modal.Body>
        </Modal>
        </section>
    )
}
