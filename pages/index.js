import { useWeb3Contract } from "react-moralis"

import justAvatarAbi from "../constants/JustAvatar.json"
import { useMoralis } from "react-moralis"

import { useEffect, useState } from "react"

import { ethers } from "ethers"

import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const {
        chainId: chainIdHex,
        isWeb3Enabled,
        Moralis,
        user,
        isAuthenticated,
        account,
    } = useMoralis()

    const chainId = parseInt(chainIdHex)

    const raffleAddress = "0x4141dec89b3f9de3e402d75f88b669dc88cc6106"

    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const [userHulu, setUserHulu] = useState("0")
    const [address, setAddress] = useState("0")
    const [userGHulu, setGUserHulu] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        
    } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "combineShuluToGhulu",
        // msgValue: entranceFee,
        params: {},
    })

    const {
        runContractFunction: decombine,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "decombineGhuluToShulu",
        // msgValue: entranceFee,
        params: {},
    })
    

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "MAX_AVATAR",
        params: {},
    })

    const { runContractFunction: getUserShulu } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "balanceOfShulu",
        params: { addr: account },
    })
    const { runContractFunction: getUserGhulu } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "balanceOfGhulu",
        params: { addr: account },
    })

    const { runContractFunction: getShuluSupply } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "getShuluSupply",
        params: {},
    })

    const { runContractFunction: getGhuluSupply } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "getGhuluSupply",
        params: {},
    })
    async function updateUI() {
        // const entranceFeeFromContract = (await getEntranceFee()).toString()

        const numPlayersFromCall = (await getShuluSupply()).toString()
        const recentWinnerFromCall = (await getGhuluSupply()).toString()
        const userHuluFromCall = (await getUserShulu()).toString()
        const userGHuluFromCall = (await getUserGhulu()).toString()

        // setEntranceFee(entranceFeeFromContract)

        setNumberOfPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        setUserHulu(userHuluFromCall)
        setGUserHulu(userGHuluFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            // setAddress(user.attributes.ethAddress)
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            <div class="flex justify-center">
                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                    <a href="#!">
                        <img
                            class="rounded-t-lg"
                            src="https://nice.4everland.store/huluxiongdi.jpg"
                            alt=""
                        />
                    </a>
                    <div class="p-6">
                        <div class="flex py-10 px-10 font-bold text-2xl text-bla ck">
                            <h1 className="m-auto text-gray-900 text-xl  mb-2 font-bold">
                                你的葫芦持有明细
                            </h1>
                        </div>


                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className=" flex items-center inline-block px-3 py-2.5 bg-teal-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={async function () {
                                    await enterRaffle({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }}
                            >
                                {isLoading || isFetching ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full m-auto"></div>
                                ) : (
                                    "合成"
                                )}
                            </button>

                            <div className=" flex items-center inline-block px-3 py-2.5 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition  ">
                                {userHulu} 银葫芦
                            </div>
                            <div className=" flex items-center inline-block px-3 py-2.5 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition  ">
                                {userGHulu} 金葫芦
                            </div>
                            <button
                                type="button"
                                className=" flex items-center inline-block px-3 py-2.5 bg-teal-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={async function () {
                                    await decombine({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }}
                            >
                                {isLoading || isFetching ? (
                                    <div className="animate-spin spinner-border h-3 w-2.5 border-b-2 rounded-full m-auto"></div>
                                ) : (
                                    "分解"
                                )}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>

            {raffleAddress ? <></> : <div>请切换到Goerli测试网络</div>}
        </div>
    )
}
