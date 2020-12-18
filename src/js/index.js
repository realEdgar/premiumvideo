const load = (async () => {

    const getData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        if(data.data.movie_count){
          return data;
        } else {
          throw new Error('No se econtro ningun resultado')

        }
    }

    const {data: {movies: actionList}} = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    const {data: {movies: dramaList}} = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
    const {data: {movies: animationList}} = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
    console.log(actionList, dramaList, animationList)

    const creandoUnTemplate = (movie) => {
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}" >
                </div>
                <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                </h4>
            </div>`
        )
    }
   
    const creandoUnDocHTML = (HTMLString) => {
      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = HTMLString
      return html.body.children[0]
    }

    const agregarListaDePelisAlHTML = (list, $container) => {
      $container.children[0].remove();
      list.forEach((movies) => {
        const HTMLString = creandoUnTemplate(movies)
        const movieElement = creandoUnDocHTML(HTMLString);
        $container.append(movieElement);
        const imagenDelElemento = movieElement.querySelector('img')
        imagenDelElemento.addEventListener('load', (event)=>{
          // imagenDelElemento.classList.add('fadeIn')
          event.srcElement.classList.add('fadeIn')
        })           
    })
    }

    const $actionContainer = document.getElementById('action');
    agregarListaDePelisAlHTML(actionList, $actionContainer)
    const $dramaContainer = document.getElementById('drama');
    agregarListaDePelisAlHTML(dramaList, $dramaContainer)
    const $animationContainer = document.getElementById('animation');
    agregarListaDePelisAlHTML(animationList, $animationContainer)



//     const getDataTwo = async (url) => {
//       const response = await fetch(url);
//       const data = await response.json();
//       if(data){
//         return data;
//       } else {
//         throw new Error('No se econtro ningun resultado')

//       }
//   }
//     const API = 'https://yts.mx/api/v2/'
//     const API_TWO = 'https://randomuser.me/api'
//     const $form = document.getElementById('form')
//     const $home = document.getElementById('home')

//     const $featuringContainer = document.getElementById('featuring')

//     const asignandoAtributos = ($element, attributes) => {
//       for(const attribute in attributes){
//         $element.setAttribute(attribute, attributes[attribute])
//       }
//     }

//     const crearTemplateParaMostrarMiBusqueda = (valorDeMiInputDelFormulario) => {
//       return (
//         `
//         <div class="featuring">
//           <div class="featurin-image">
//             <img src="${valorDeMiInputDelFormulario.medium_cover_image}" width="70" height="100">
//           </div>
//           <div class="featuring-content">
//             <p class="featuring-title">Pelicula encontrada</p>
//             <p class="featuring-album">${valorDeMiInputDelFormulario.title}</p>
//           </div>
//         </div>
//         `
//       )
//     }

//     $form.addEventListener('submit', async (event) => {
//       event.preventDefault();
//       $home.classList.add('search-active')
//       const $creacionLoader = document.createElement('img');
//       asignandoAtributos($creacionLoader, {
//         src: 'src/images/loader.gif',
//         height: 50,
//         width: 50,
//       })
//       $featuringContainer.append($creacionLoader)
//       try {

//         const data = new FormData($form)
//         const {data: {movies: valorDeMiInputDelFormulario}} = await getData(`${API}list_movies.json?limit=1&query_term=${data.get('name')}`)
//         const valorDeFormularioEnString = crearTemplateParaMostrarMiBusqueda(valorDeMiInputDelFormulario[0])
//         $featuringContainer.innerHTML = valorDeFormularioEnString

//       } catch(error) {
//         $creacionLoader.remove()
//         alert(error)
//         $home.classList.remove('search-active')  
//       }
      
//     })
           
//     const creandoUnTemplate = (movie, category) => {
//         return (
//             `<div class="primaryPlaylistItem"  data-id="${movie.id}" data-category=${category}>
//                 <div class="primaryPlaylistItem-image">
//                     <img src="${movie.medium_cover_image}">
//                 </div>
//                 <h4 class="primaryPlaylistItem-title">
//                     ${movie.title}
//                 </h4>
//             </div>`
//         )
//     }
//     const agregarUnEventoDeClick = ($element) => {
//       $element.addEventListener('click', () => {
//         showModal($element);
//       })
//     }
//     const creandoUnDocHTML = (HTMLString) => {
//       const html = document.implementation.createHTMLDocument()
//       html.body.innerHTML = HTMLString
//       return html.body.children[0]
//     }
//     const agregarListaDePelisAlHTML = (list, $container, category) => {
//       $container.children[0].remove();
//       list.forEach((movies) => {
//         const HTMLString = creandoUnTemplate(movies, category)
//         const movieElement = creandoUnDocHTML(HTMLString);
//         $container.append(movieElement);
//         const imagenDelElemento = movieElement.querySelector('img')
//         imagenDelElemento.addEventListener('load', (event)=>{
//           // imagenDelElemento.classList.add('fadeIn')
//           event.srcElement.classList.add('fadeIn')
//         })        
//         agregarUnEventoDeClick(movieElement);      
//     })
//     }

//     const existenPelis = async (category) => {
//       const listaDeNombres = `${category}List`
//       const listaExistente = window.localStorage.getItem(listaDeNombres)
//       if(listaExistente) {
//         return JSON.parse(listaExistente)
//       } else {
//         const {data: {movies: data }} = await getData(`${API}list_movies.json?genre=${category}`)
//         window.localStorage.setItem(listaDeNombres, JSON.stringify(data))
//         return data
//       }     
//     }   

//     const dataAction = await existenPelis('action')
//     // window.localStorage.setItem('actionList', JSON.stringify(dataAction))
//     const $actionContainer = document.getElementById('action');
//     agregarListaDePelisAlHTML(dataAction, $actionContainer, 'action')
    
//     const dataDrama = await await existenPelis('drama')
//     // window.localStorage.setItem('dramaList', JSON.stringify(dataDrama))
//     const $dramaContainer = document.getElementById('drama');
//     agregarListaDePelisAlHTML(dataDrama, $dramaContainer, 'drama')
    
//     const dataAnimation= await await existenPelis('animation')
//     // window.localStorage.setItem('animationList', JSON.stringify(dataAnimation))
//     const $animationContainer = document.getElementById('animation');
//     agregarListaDePelisAlHTML(dataAnimation, $animationContainer, 'animation')
    
    // const nombresDePlayListDeAmigos = await getDataTwo(`${API_TWO}`)
    // const $listaDeAmigosContainer = document.querySelector("#home > div.home-sidebar > div > div:nth-child(3)")
    // console.log($listaDeAmigosContainer)

    // const $boton = document.getElementById('btn-refresh')
    // $boton.addEventListener('click', async () => {
    //   console.log(localStorage)
    //   window.localStorage.clear();
    //   await existenPelis('action')
    //   await existenPelis('drama')
    //   await existenPelis('animation')
    //   console.log(localStorage)
    // })
    
    // const $modal = document.getElementById('modal');
    // const $overlay = document.getElementById('overlay')
    // const $hideModal = document.getElementById('hide-modal')

    // const $modalImg = $modal.querySelector('img')
    // const $modalTitle = $modal.querySelector('h1')
    // const $modalDescription = $modal.querySelector('p')

    // const encontrarPorId = (list, id) => {
    //   return list.find(movie => movie.id === parseInt(id, 10))
    // }
    
    // const  encontrarPeli = (id, category) => {
    //   switch(category) {
    //     case 'action': {
    //       return encontrarPorId(dataAction, id)
    //     }
    //     case 'drama': {
    //       return encontrarPorId(dataDrama, id)
    //     }
    //     default: {
    //       return encontrarPorId(dataAnimation, id)
    //     }
    //   }
    // }

    // const showModal = ($element) => {
    //   $overlay.classList.add('active')
    //   $modal.style.animation = 'modalIn .5s forwards'
    //   const id = parseInt($element.dataset.id)
    //   const category = $element.dataset.category
    //   const valoresObtenidos = encontrarPeli(id, category)
    //   $modalTitle.textContent = valoresObtenidos.title
    //   $modalImg.setAttribute('src', valoresObtenidos.medium_cover_image)
    //   $modalDescription.textContent = valoresObtenidos.description_full
    // }

    // // $hideModal.addEventListener('click', () => {
    // //   $overlay.classList.remove('active')
    // //   $modal.style.animation = 'modalOut .5s forwards'
    // // })

    // $hideModal.addEventListener('click', () => {
    //   $overlay.classList.remove('active')
    //   $modal.style.animation = 'modalOut 0.5s forwards'
    // })

})()