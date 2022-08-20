console.log("Issue tracker app");

var issueList = {
    issues: [],

    displayIssues: function () {

        if (this.issues.length === 0) {
            console.log("No issue in the issues list")
        }
        else {
            console.log('myIssues:');
            var issueWithCompleatedStatus = '';
            for (var i = 0; i < this.issues.length; i++) {
                var issue = this.issues[i];
                if(issue.compleated === true){
                    issueWithCompleatedStatus = '(X)-'+issue.issueName;
                }
                else{
                    issueWithCompleatedStatus = '()-'+issue.issueName;
                }
                console.log(issueWithCompleatedStatus);
            }
        }
    },

    addIssue: function (newIssue) {
        this.issues.push({
            issueName: newIssue,
            compleated: false
        });
        this.displayIssues();
    },

    changeIssue: function (position, newIssue) {
        this.issues[position].issueName = newIssue;
        this.displayIssues();
    },

    deleteIssue: function (position) {
        this.issues.splice(position, 1);
        this.displayIssues();
    },

    toggleIssue: function (position) {
        var issue = this.issues[position];
        issue.compleated = !issue.compleated
        this.displayIssues();
    },

    toggleAll: function(){
        var totalIssues = this.issues.length;
        var compleatedIssues = 0;
        for(var i=0;i<totalIssues;i++){
            if(this.issues[i].compleated === true){
                compleatedIssues++
            }
            
            if(totalIssues === compleatedIssues){
                for(var i=0;i<totalIssues;i++){
                    this.issues[i].compleated = false
                }
            }
            else{
                for(var i=0;i<totalIssues;i++){
                    this.issues[i].compleated = true
                }
            }
        }
        this.displayIssues();
    }
}


var handlers= {
    displayIssues: function(){
        issueList.displayIssues();
    },
    toggleAll: function(){
        issueList.toggleAll();
    },
    addIssue: function(){
        var issueText = document.getElementById('issueText');
        issueList.addIssue(issueText.value);
        view.displayIssues();
        issueText.value = '';
    },
    changeIssue: function(){
        var changeIssuePositionInput = document.getElementById('changeIssuePositionInput');
        var changeIssueTextInput = document.getElementById('changeIssueTextInput');
        issueList.changeIssue(changeIssuePositionInput.valueAsNumber, changeIssueTextInput.value);
        view.displayIssues();
        changeIssueTextInput= '';
        changeIssuePositionInput = '';
    },
    deleteIssue: function(position){
        issueList.deleteIssue(position);
        view.displayIssues();
    },
    toggleIssue:function() {
        var toggleIssuePositionInput = document.getElementById('toggleIssuePositionInput');
        issueList.toggleIssue   (toggleIssuePositionInput.value);
        view.displayIssues();
        toggleIssuePositionInput.value='';
    }
};

var view = {
    displayIssues: function(){
        var issueUI = document.querySelector('ul');
        issueUI.innerHTML = '';
        var issueWithCompleatedStatus = '';
        for(var i=0;i< issueList.issues.length;i++){
            var issueLi = document.createElement('li');
            var issue = issueList.issues[i];
            if(issue.compleated === true) {
                issueWithCompleatedStatus = '(X)-'+ issue.issueName;
            }else{
                issueWithCompleatedStatus = '()' + issue.issueName;
            }
            issueLi.id= i;
            issueLi.textContent = issueWithCompleatedStatus;
            issueLi.appendChild(this.createDeleteButton());
            issueUI.appendChild(issueLi);
        }
    },
        createDeleteButton: function(){
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'deleteIssue';
            return deleteButton;
        },

        setUpEventListener:function(){
            var issueUI = document.querySelector('ul');
            issueUI.addEventListener('click', function(event){
                var elementClicked = event.target;

                if(elementClicked.className === 'deleteIssue'){
                    handlers.deleteIssue(parseInt(elementClicked.parentNode.id));
                }
            });
        }
    };

view.setUpEventListener();





