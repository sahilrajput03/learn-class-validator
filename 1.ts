import {validateSync, IsDefined, IsNotEmpty} from 'class-validator'
import expect from 'expect'

export class ChatMessage {
	@IsDefined()
	@IsNotEmpty()
	message: string

	@IsDefined()
	@IsNotEmpty()
	toUserId: string
}

/**
 * TEST: VALID CHAT MESSAGE
 */
let sample1 = new ChatMessage()
sample1.message = 'Hello world'
sample1.toUserId = '1'

const validation = validateSync(sample1)
expect(Array.isArray(validation)).toBeTruthy()
expect(validation.length).toBe(0)

/**
 * TEST: INVALID CHAT MESSAGE
 */
let sample2 = new ChatMessage()
sample2.message = ''
sample2.toUserId = ''

const validations = validateSync(sample2)
let [validation1, validation2] = validations

const m1 = `An instance of ChatMessage has failed the validation:
 - property message has failed the following constraints: isNotEmpty`
const m2 = `An instance of ChatMessage has failed the validation:
 - property toUserId has failed the following constraints: isNotEmpty`

expect(validation1.toString().trimEnd()).toBe(m1)
expect(validation2.toString().trimEnd()).toBe(m2)

let [messg1, messg2] = validations.map((e) => Object.values(e.constraints as any)[0])

expect(messg1).toBe('message should not be empty')
expect(messg2).toBe('toUserId should not be empty')

console.log('Reached end of file.')
