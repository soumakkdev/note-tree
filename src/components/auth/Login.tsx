'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/AuthContext'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'

export default function Login() {
	const { replace } = useRouter()
	const { loginWithPassword } = useAuth()
	const form = useForm({
		defaultValues: {
			email: 'test@tree.com',
			password: 'frM9QTXqhp9DeHT',
		},
		onSubmit: async ({ value }) => {
			try {
				// console.log(value)
				const result = await loginWithPassword(value)
				replace('/')
			} catch (error) {
				console.log(error)
			}
		},
	})
	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 relative">
			{/* <figure className="absolute -z-10 inset-0">
				<img src="/images/tree.jpg" alt="" className="h-full object-cover w-full" />
			</figure> */}
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						void form.handleSubmit()
					}}
				>
					<div className="space-y-1">
						<form.Field name="email">
							{(field) => (
								<>
									<Label htmlFor={field.name}>Email address</Label>
									<Input
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										id={field.name}
										placeholder="Email"
									/>
								</>
							)}
						</form.Field>
					</div>

					<div className="space-y-1">
						<form.Field name="password">
							{(field) => (
								<>
									<Label htmlFor={field.name}>Password</Label>
									<Input
										type="password"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										id={field.name}
										placeholder="Password"
									/>
								</>
							)}
						</form.Field>
					</div>

					<div>
						<Button size="lg" className="w-full">
							Login
						</Button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Sign up here
					</a>
				</p>
			</div>
		</div>
	)
}
