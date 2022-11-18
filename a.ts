/* Source: https://github.com/typestack/class-validator */
import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from 'class-validator'

export class Post {
	@Length(10, 20)
	title: string

	@Contains('hello')
	text: string

	@IsInt()
	@Min(0)
	@Max(10)
	rating: number

	@IsEmail()
	email: string

	@IsFQDN()
	site: string

	@IsDate()
	createDate: Date
}

let post = new Post()
post.title = 'Hello' // should not pass
post.text = 'this is a great post about hell world' // should not pass
post.rating = 11 // should not pass
post.email = 'google.com' // should not pass
post.site = 'googlecom' // should not pass

validate(post).then((errors) => {
	// errors is an array of validation errors
	if (errors.length > 0) {
		// console.log('validation failed. errors: ', errors)
		// console.log('validation failed. errors: ', errors.map(e => Object.keys(e)))
		console.log('validation failed. errors: ', errors.map((e) => Object.entries(e.constraints as any)))
    // OUTPUT:
    // [
    //   [ [ 'isLength','title must be longer than or equal to 10 characters' ] ],
    //   [ [ 'contains', 'text must contain a hello string' ] ],
    //   [ [ 'max', 'rating must not be greater than 10' ] ],
    //   [ [ 'isEmail', 'email must be an email' ] ],
    //   [ [ 'isFqdn', 'site must be a valid domain name' ] ],
    //   [ [ 'isDate', 'createDate must be a Date instance' ] ]
    // ]
    
	} else {
		console.log('validation succeed')
	}
})

validateOrReject(post).catch((errors) => {
	console.log('Promise rejected (validation failed). Errors: ', errors)
})
// or
async function validateOrRejectExample(input: any) {
	try {
		await validateOrReject(input)
	} catch (errors) {
		console.log('Caught promise rejection (validation failed). Errors: ', errors)
	}
}
