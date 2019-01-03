document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let followers = document.getElementById('searchUsers').value;
    console.log(followers);
    if (followers !== '') {
        fetch(`https://api.github.com/users/${followers}/followers`)
            .then(response => response.json())
            .then(data => data.message === "Not Found"  || data.status === 404 ? showError('User not found!') : followersData(data))
            .catch(error => console.log(error));
    }
    else {
        showError('Please enter a user name');
    }
})

const showError = errorMessage =>{ 
    document.getElementById('container').innerHTML = "";  
    document.getElementById('searchUsers').value = '';  
    document.getElementById('error_log').innerHTML = errorMessage;
    
}

const followersData = followerDetails => {
    let followerCard = document.getElementById('container');
    followerCard.innerHTML = '';
    document.getElementById('error_log').innerHTML = "";    
    document.getElementById('searchUsers').value = '';
    followerDetails.map((item, index) => {
        followerCard.innerHTML += `    
            <div class="col-md-3 m-3">
            <div class="card">
                <img class="card-img-top margin-img" src="${item.avatar_url}" />
                <div class="card-body">
                    <h5>Username: ${item.login}</h5>
                    <a href="${item.html_url}" class="btn btn-primary"><i class="fab fa-github"></i>View Profile </a> 
                </div>
            </div>
        </div>   
    `
    
    }

    )
}







