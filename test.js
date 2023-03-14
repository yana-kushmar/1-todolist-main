const arr = ['Igor', 'Yana', 'Kyubi']

const result = []
for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] + 1)
}

const result2 = arr.map((item) => {
    return item + 'chka'
})

console.log(result, result2)