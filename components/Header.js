import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current h-10 w-12 mr-2"
                    width="54"
                    height="54"
                    enableBackground="new 0 0 54 54"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                >
<path
        d="M1348 3737c-74-129-168-236-269-306-29-20-54-41-56-47-2-7 14-21 37-33l40-21 40 36c55 50 77 44 116-31 45-85 50-115 23-146-35-39-59-100-59-152 0-42-5-55-39-93-95-108-151-263-158-439-9-215 45-369 176-508l71-74-113-5c-138-7-214-33-261-92-26-31-31-47-31-89 0-83 69-208 141-258 21-14 21-15-42-99-66-87-159-261-170-319-5-25-16-37-48-53-62-31-85-57-102-114-20-71-6-124 47-177 36-37 39-43 39-97 0-76 18-132 68-209 56-86 58-135 6-185-37-36-41-61-13-79 22-14 57 9 96 60s40 138 1 203c-54 90-71 126-79 158-11 48 3 39 33-22 15-30 53-83 86-117 32-35 64-74 71-86 27-51 3-155-56-244-29-44-24-71 14-77s114 126 129 225c12 80-11 138-86 217-64 68-96 113-87 122 2 2 15-5 30-16 14-11 51-30 83-42 99-38 154-110 154-202 0-38-25-132-50-189-23-52-15-87 19-87 24 0 32 12 66 95 25 61 29 83 29 175 1 98-1 108-27 153-32 54-87 98-155 123-58 21-103 54-120 86-12 22-11 29 12 62 53 78 43 163-26 229-21 20-45 37-53 37s-15 5-15 11c0 28 69 170 120 247 89 135 112 158 166 166 45 6 134 57 134 77 0 6 4 8 8 5 5-3 1-43-9-88-39-178-19-415 50-595 80-207 260-423 437-524 21-12 58-33 81-46 57-33 201-81 293-99 98-18 294-18 395 1 423 80 746 382 856 801 21 77 24 111 23 254-1 144-4 177-26 261-31 113-76 216-142 318-44 69-48 72-62 55-14-18-14-17-3 5 10 22 5 30-82 115-101 98-208 171-329 222-70 31-194 68-250 76-20 2-24 9-25 38 0 27-6 37-26 47-24 12-25 15-18 60 11 69 11 191-1 254-6 30-28 92-51 139-33 70-55 99-124 167-139 135-318 209-529 217-88 4-101 7-125 29-47 44-87 58-157 55-46-2-68 2-78 12-22 23-96 172-96 193 0 11 29 67 65 126 62 102 64 108 54 143-5 21-13 39-18 42-4 3-23-23-43-57zm624-667c209-77 345-216 393-400 19-72 16-215-4-282l-12-38h-57c-149-1-313-44-472-126-131-67-220-133-342-251l-46-45-53 28c-169 92-278 293-279 512 0 295 172 538 440 619 66 20 91 23 210 19 122-3 143-6 222-36zm641-904c49-15 114-38 145-53 136-61 298-192 391-316 183-242 238-584 142-885-90-280-331-527-609-623-132-46-184-54-337-54-159 0-234 11-345 52-351 129-593 422-651 786-16 105-6 289 21 392 97 363 403 648 775 721 47 9 120 12 225 10 132-3 168-8 243-30zm-1258-336c9-14-49-146-92-212-65-98-126-128-192-93-57 29-130 148-131 211 0 39 33 71 91 89 52 16 315 20 324 5zm1846-37c13-16 12-17-3-4-17 13-22 21-14 21 2 0 10-8 17-17z"
        transform="matrix(.1 0 0 -.1 0 380)"
      ></path>                </svg>

                <Link href="/">
                    <a className="font-semibold text-xl tracking-tight">福禄葫芦</a>
                </Link>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg
                        class="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-sm lg:flex-grow">


                </div>
                <div>
                    <Link href="/sell-nft">
                        <a
                            href="/sell-nft"
                            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                        >
                            交易葫芦
                        </a>
                    </Link>
                </div>
            </div>
            <ConnectButton moralisAuth={false} />
        </nav>
    )
}
