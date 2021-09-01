const searchResult = () => {
    const searchField = document.getElementById('search-field').value 

    const url = `http://openlibrary.org/search.json?q=${searchField}`;
	
    searchField.value =''
	fetch(url)
		.then((response) => response.json())
		.then((number) => displayResultNo(number.numFound));

    fetch(url)
		.then((response) => response.json())
		.then((data) => displayResult(data.docs));
}

const displayResultNo = (number) => { 
   document.getElementById('display-result-no').innerHTML = `
   <h5> Result found: ${number} </h5>
   `
}

const displayResult = books => {
    const displayDiv = document.getElementById('display-div')
    books.forEach(book => {
        console.log(book)
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="card mx-auto mb-2 border border-3" style="max-width: 692px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://covers.openlibrary.org/b/id/${
				         	book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text fw-bold fst-italic">Author: ${
						        book.author_name ? book.author_name : 'Unknown'}</p>
                            <p class="card-text"><small class="text-muted">First published: ${
						        book.first_publish_year
					           }</small></p>
                            <p class="card-text"><small class="text-muted">Publisher: ${
					        	book.publisher[0]}</small></p>
                        </div>
                    </div>
                </div>
            </div>        
        `;
        displayDiv.appendChild(div)
    })

}

