import names from './names.json'
// console.log(names.length); // 2198

/* CONSTANTS */
const MINIMUM_SIMILAR_ITEM = 2 // DEFAULT = 1
const IGNORE_LIST = ['City', 'BS', 'FC', 'SC', 'FK', 'U16', 'U20', 'U21', 'North']

// STEP1: make it unique array (removing duplcicates)
const uniqueNames = Array.from(new Set(names))
// console.log("uniqueNames", uniqueNames.length) // 1727

// STEP2: Get unique single words by `.map().split().flat()`
const singleWordUniqueArray = uniqueNames.map((name) => name.split(' ')).flat()
// console.log("singleWordUniqueArray", singleWordUniqueArray)
// console.log("singleWordUniqueArray.length", singleWordUniqueArray.length) // 3857
console.log('singleWordUniqueArray.length * names.length', singleWordUniqueArray.length * names.length)

// STEP3: Grop names by singleWord with more than two repetions
const similarNamesMap: any = {}

// make it 1 to include single items of array

singleWordUniqueArray.forEach((singleWord, i) => {
	let similarNames: any = []

	if (IGNORE_LIST.some((ignoreWord) => ignoreWord === singleWord)) return

	uniqueNames.forEach((name) => {
		if (name.split(' ').some((word) => word === singleWord)) {
			similarNames.push(name)
		}
	})

	if (similarNames.length > MINIMUM_SIMILAR_ITEM) {
		similarNamesMap[singleWord] = similarNames
	}
})
console.log('🚀 similarNamesMap', similarNamesMap)
console.log('🚀 item count in similarNamesMap:', Object.keys(similarNamesMap).length)
