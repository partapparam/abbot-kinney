import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { postForm } from "../services/formService"
import { LetterContext } from "../providers/letterContext"
import { LoadingSpinner } from "./loading"

// type LetterFormValues = {
//   firstName: string
//   lastName: string
//   email: string
//   permission: boolean
//   futureContact: boolean
//   letter?: string
// }

export const LetterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getLetter } = useContext(LetterContext)
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .required("An email is required")
      .email("Email is invalid"),
    permission: Yup.bool().required().oneOf([true], "Please accept the terms."),
    futureContact: Yup.bool().required(),
    letter: Yup.string(),
  })

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      permission: false,
      futureContact: false,
    },
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    const letter = await getLetter()
    setIsLoading(true)
    try {
      data.letter = letter
      const status = await postForm(data)
      if (status === 200) {
        navigate("/thank-you")
      } else {
        throw Error("Please resubmit.")
      }
    } catch (error) {
      console.log("we had an error")
      // This will allow us to handle the error message and please Typescript
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      reset()
      setIsLoading(false)
    }
  }

  const watchLastName = watch("lastName", "")
  const watchFirstName = watch("firstName", "")
  useEffect(() => {
    searchParams
    setSearchParams({ first: watchFirstName, last: watchLastName })
  }, [watchFirstName, watchLastName])

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div>
          <div className="flex flex-col pt-10 pb-2 text-center">
            <p className="text-2xl pb-1 text-[#2385A3]">
              You're ready to send.
            </p>
            <p>To send the above letter, please enter info below:</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-black flex flex-col p-6 sm:p-8 gap-y-4 w-full"
          >
            <div>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className={`w-full py-4 px-2 focus:ring-emerald-800  bg-transparent ${
                  errors.firstName ? "is-invalid border-red-500" : ""
                }`}
                placeholder="First Name"
              />
              <div className="text-red-500 text-sm">
                {errors.firstName?.message}
              </div>
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className={`w-full py-4 px-2 focus:ring-emerald-800  bg-transparent ${
                  errors.lastName ? "is-invalid border-red-500" : ""
                }`}
                placeholder="Last Name"
              />
              <div className="text-red-500 text-sm">
                {errors.lastName?.message}
              </div>
            </div>
            <div>
              <input
                type="text"
                id="email"
                {...register("email")}
                className={`rounded-none w-full py-4 px-2 focus:ring-emerald-800   bg-transparent ${
                  errors.lastName ? "is-invalid border-red-500" : ""
                }`}
                placeholder="Email"
              />
              <div className="text-red-500 text-sm">
                {errors.email?.message}
              </div>
            </div>
            <div className="py-4 flex flex-row gap-x-2 items-center">
              <input
                type="checkbox"
                {...register("permission")}
                className="w-8 h-8 border-[#2385A3] rounded-none mr-2 text-[#A0A675]"
                name="permission"
              />
              <label htmlFor="permission" className="text-sm">
                <b>Yes,</b> I give 881 Abbot Kinney Project permission to send
                this letter on you behalf.
              </label>
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              <input
                type="checkbox"
                {...register("futureContact")}
                className="w-8 h-8 border-[#2385A3] rounded-none mr-2 text-[#A0A675]"
                name="futureContact"
              />
              <label className="text-sm" htmlFor="futureContact">
                <b>Yes,</b> I would like to be contacted in the future about
                upcoming hearings, alerts, events, and more about the 881 Abbot
                Kinney Project via email and/or SMS.
              </label>
            </div>
            <div className="flex justify-center py-4 items-center gap-4">
              <input
                className="bg-[#2385A3] hover:shadow-xl hover:cursor-pointer shadow-lg text-white !px-10 !py-4"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
