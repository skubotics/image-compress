const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
let search = []
let compressVal = 1
let file = ''
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getFormat = () => {
  return new Promise((resolve, reject) => {
    rl.question(`\n\nWhich File Format ?\n1. JPEG\n2. PNG\nSelect One : `, (_answer) => {
	    let _format = _answer==1?['JPEG','JPG','jpg','jpeg']:_answer==2?['PNG','png']:[];
	  	file = _answer==1?'jpg':'png'
      console.log(`You Choose : ${_answer==1?'JPEG':_answer==2?'PNG':'Not in Menu!'}!`)
		_format.forEach(i=>{
			search.push('images/*.'+i)
		})
		resolve()
    })
  })
}

const getCompression = () => {
  return new Promise((resolve, reject) => {
    rl.question(`\n\nEnter Compression % ? (Enter between 0 & 100) : `, (_answer) => {
    compressVal = _answer>0 && _answer<=100 ? +_answer : 100;
		resolve()
    })
  })
}

const main = async () => {
  await getFormat()
  await getCompression()
  console.log(`Starting Compressing ${file.toUpperCase()} Images with ${compressVal}% Rate...`)

  if(file=='jpg')
    await imagemin([...search], {
        destination: "compressed-images",
        plugins: [
          imageminMozjpeg({ quality: compressVal })
        ]
    });
  else if(file=='png')
    await imagemin([...search], {
        destination: "compressed-images",
        plugins: [
          imageminPngquant({ quality: [+compressVal/100,+compressVal/100] })
        ]
    });
  console.log(`${file.toUpperCase()} Conversion Completed !`)
  rl.close()
}

main()