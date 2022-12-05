import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Form, useNotification, Button } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { useEffect, useState } from "react"
import { data } from "autoprefixer"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = "0x4141dec89b3f9de3e402d75f88b669dc88cc6106"
    const dispatch = useNotification()
    const [proceeds, setProceeds] = useState("0")

    const { runContractFunction } = useWeb3Contract()

    const submitContact = async (event) => {
        event.preventDefault()
        data = [
            {
                name: "NFT Address",
                type: "text",
                inputWidth: "50%",
                value: "0xe667Dd06b268eBf3845B1BD66904bd743478Fe0d",
                key: "nftAddress",
            },
            {
                name: "Token ID",
                type: "number",
                value: event.target.tokenid.value,
                inputWidth: "10%",
                key: "tokenId",
            },
            {
                name: "Price (in ETH)",
                type: "number",
                inputWidth: "10%",
                value: event.target.prcie.value,
                key: "price",
            },
        ]
        listGhulu(data)
    }

    async function approveAndList(data) {
        console.log("Approving...")
        const nftAddress = data[0].value
        const tokenId = data[1].value
        const price = ethers.utils.parseUnits(data[2].value, "ether").toString()

        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: (tx) => handleApproveSuccess(tx, nftAddress, tokenId, price),
            onError: (error) => {
                console.log(error)
            },
        })
    }

    async function listGhulu(data) {
        const price = ethers.utils.parseUnits(data[2].value, "ether").toString()

        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listGhulu",
            params: {
                price: price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        })
    }
    async function getList() {
     

        const queryOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "getListGhulu",
            params: {
                saleNumber: 0
            },
        }

        await runContractFunction({
            params: queryOptions,
            onSuccess: console.log("dd"),
            onError: console.log("dd")

        })
        

    }
    // const { runContractFunction: getList } = useWeb3Contract({
    //     abi: nftMarketplaceAbi,
    //     contractAddress: marketplaceAddress,
    //     functionName: "getListGhulu",
    //     params: {
    //         saleNumber: 0
    //     },
    // })


    async function handleListSuccess() {
        dispatch({
            type: "success",
            message: "NFT listing",
            title: "NFT listed",
            position: "topR",
        })
    }

    const handleWithdrawSuccess = () => {
        dispatch({
            type: "success",
            message: "Withdrawing proceeds",
            position: "topR",
        })
    }

    async function setupUI() {

        for (let index = 0; index < 2; index++) {
            const element = await getList(0);
            console.log(element)
            
        }
        const returnedProceeds = await runContractFunction({
            params: {
                abi: nftMarketplaceAbi,
                contractAddress: marketplaceAddress,
                functionName: "getProceeds",
                params: {
                    seller: account,
                },
            }
        })

        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString())
        }
    }

    useEffect(() => {
        setupUI()
    }, [proceeds, account, isWeb3Enabled, chainId])

    return (
        <div className={styles.container}>
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm m-auto mt-16">
                <form onSubmit={submitContact}>
                    <div class="m-auto flex items-center justify-between"></div>
                    <div class="flex items-center justify-between mt-2">
                        <label for="saleprcie" class="form-label inline-block mb-2 text-gray-700">
                            出售价格
                        </label>
                        <input
                            type="float"
                            class="
        
        px-1
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="prcie"
                            placeholder="售价"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            class="
                        flex justify-center px-6 py-2.5 bg-teal-500 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            上架葫芦
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex justify-center mt-7">
                <button
                    type="button"
                    className=" m-auto items-center inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: nftMarketplaceAbi,
                                contractAddress: marketplaceAddress,
                                functionName: "withdrawProceeds",
                                params: {},
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess,
                        })
                    }}
                >
                    Claim {ethers.utils.formatUnits(proceeds, "ether")} Balance
                </button>
            </div>
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm m-auto mt-16">
                <form onSubmit={submitContact}>
                    <div class="m-auto flex items-center justify-between"></div>
                    <div class="flex items-center justify-between mt-2">
                        <label for="saleprcie" class="form-label inline-block mb-2 text-gray-700">
                            葫芦ID
                        </label>
                        <input
                            type="float"
                            class="
        
        px-1
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="huluId"
                            placeholder="葫芦id"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            class="
                        flex justify-center px-6 py-2.5 bg-teal-500 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            购买葫芦
                        </button>
                    </div>
                </form>
            </div>

            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                葫芦出售编号
                            </th>
                            <th scope="col" class="py-3 px-6">
                                葫芦出售价格
                            </th>
                            <th scope="col" class="py-3 px-6">
                                状态
                            </th>
                            <th scope="col" class="py-3 px-6">
                                持有人
                            </th>
                            <th scope="col" class="py-3 px-6">
                                点击购买
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                #0
                            </th>
                            <td class="py-4 px-6">1 ETH</td>
                            <td class="py-4 px-6">在售</td>
                            <td class="py-4 px-6">0x555f23d</td>
                            <td class="py-4 px-6">
                                <a
                                    href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    BUY
                                </a>
                            </td>
                        </tr>
                        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                               #1
                            </th>
                            <td class="py-4 px-6">1 ETH</td>
                            <td class="py-4 px-6">在售</td>
                            <td class="py-4 px-6">0x555f23d</td>
                            <td class="py-4 px-6">
                                <a
                                    href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                     BUY
                                </a>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                #2
                            </th>
                            <td class="py-4 px-6">1 ETH</td>
                            <td class="py-4 px-6">在售</td>
                            <td class="py-4 px-6">0x555f23d</td>
                            <td class="py-4 px-6">
                                <a
                                    href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                     BUY
                                </a>
                            </td>
                        </tr>
                        <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                #3
                            </th>
                            <td class="py-4 px-6">1 ETH</td>
                            <td class="py-4 px-6">在售</td>
                            <td class="py-4 px-6">0x555f23d</td>
                            <td class="py-4 px-6">
                                <a
                                    href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                   BUY
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                               #4
                            </th>
                            <td class="py-4 px-6">1 ETH</td>
                            <td class="py-4 px-6">在售</td>
                            <td class="py-4 px-6">0x555f23d</td>
                            <td class="py-4 px-6">
                                <a
                                    href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                     BUY
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
