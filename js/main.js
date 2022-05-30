document.querySelector('#break').addEventListener('click', breakCookie)

async function breakCookie(){

  const res = await fetch(`/api?cookie=fortune`)
  const data = await res.json()

  console.log(data);
  document.querySelector("h2").textContent = data.cookie
  document.querySelector("#beforeClick").style.display = 'none'
  document.querySelector("#afterClick").style.display = 'block'
}
