//search function//
const searchResult = () => {
     previousDisplay('display-div');
     previousDisplay('display-result-no');

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if ((searchText === '')) {
		document.getElementById('display-result-no').innerText =
			"You haven't write anything";
	} else {
		searchField.value = '';
        displaySpinner('block');

		const url = `http://openlibrary.org/search.json?q=${searchText}`;

		fetch(url)
			.then((response) => response.json())
			.then((number) => displayResultNo(number.numFound));

		fetch(url)
			.then((response) => response.json())
			.then((data) => displayResult(data.docs));
	}
}

//display result number found
const displayResultNo = (number) => { 
             if (number === 0) {
					document.getElementById('display-result-no').innerText =
						'Nothing matched found';
                        displaySpinner('none');
				} else { 
                    document.getElementById('display-result-no').innerHTML = 
                    `
                    <h5> Result found: ${number} </h5>
                     `;
                }
}

//spinner display
const displaySpinner = style => {
    document.getElementById('spinner').style.display = style
}

//erase previous content
const previousDisplay = content => {
    document.getElementById(content).textContent = '';
}

//display the result found with some extra information
const displayResult = books => {
     displaySpinner('none');
    const displayDiv = document.getElementById('display-div')
   
    books.forEach(book => {
        console.log(book)
            const div = document.createElement('div');
			div.innerHTML = `
            <div class="card mx-auto mb-2 border border-3" style="max-width: 692px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://covers.openlibrary.org/b/id/${
							book.cover_i
						}-M.jpg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text fw-bold fst-italic">Author: ${
								book.author_name ? book.author_name : 'Unknown'
							}</p>
                            <p class="card-text"><small class="text-muted">First published: ${
								book.first_publish_year
							}</small></p>
                            <p class="card-text"><small class="text-muted">Publisher: ${
								book.publisher[0]
							}</small></p>
                        </div>
                    </div>
                </div>
            </div>        
        `;
			displayDiv.appendChild(div);
    }) ;      
}

