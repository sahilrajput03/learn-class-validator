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

const [validation1, validation2] = validateSync(sample2).map((e) => Object.values(e.constraints as any)[0])

expect(validation1).toBe('message should not be empty')
expect(validation2).toBe('toUserId should not be empty')
