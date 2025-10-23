var signupName=document.getElementById('signupName');
var signupEmail=document.getElementById('signupEmail');
var signupPassword=document.getElementById('signupPassword');
var signinEmail=document.getElementById('email');
var signinPassword=document.getElementById('signinPassword');
var signUpArray=[];
if(localStorage.getItem('users')!=null){
signUpArray=JSON.parse(localStorage.getItem('users'));
}
var sessionUsername=localStorage.getItem('sessionUsername');
var welcomeElement=document.getElementById('username');
var pathparts=location.pathname.split('/');
var baseURL=pathparts.slice(0,pathparts.length-2).join('');
if(baseURL!==''&&!baseURL.endsWith('/')){
baseURL+='/';
}
if(baseURL===''){
baseURL='/';
}
if(welcomeElement){
if(sessionUsername){
welcomeElement.innerHTML="Welcome "+sessionUsername;
}else{
window.location.href=baseURL+'index.html';
}
}
function isEmpty(){
if(!signupName||!signupEmail||!signupPassword){
return false;
}
if(signupName.value==""||signupEmail.value==""||signupPassword.value==""){
return false;
}else{
return true;
}
}
function isEmailExist(){
for(var i=0;i<signUpArray.length;i++){
if(signUpArray[i].email.toLowerCase()==signupEmail.value.toLowerCase()){
return false;
}
}
return true;
}
function signUp(){
var existElement=document.getElementById('exist');
if(!existElement){
console.error("Missing element with ID 'exist' on Sign Up page.");
return;
}
if(isEmpty()==false){
Swal.fire({
icon:'error',
title:'Missing Fields',
text:'All inputs are required'
});
return;
}
var emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(signupEmail.value)){
Swal.fire({
icon:'warning',
title:'Invalid Email',
text:'Invalid email format'
});
return;
}
if(isEmailExist()==false){
Swal.fire({
icon:'info',
title:'Already Registered',
text:'Email already exists'
});
return;
}
var signUpUser={
name:signupName.value,
email:signupEmail.value,
password:signupPassword.value,
}
signUpArray.push(signUpUser);
localStorage.setItem('users',JSON.stringify(signUpArray));
signupName.value='';
signupEmail.value='';
signupPassword.value='';
Swal.fire({
icon:'success',
title:'Registration Successful!',
text:`Welcome ${signUpUser.name}! You can now log in.`,
showConfirmButton:false,
timer:1500
})
}
function isLoginEmpty(){
if(!signinPassword||!signinEmail){
return false;
}
if(signinPassword.value==""||signinEmail.value==""){
return false;
}else{
return true;
}
}
function login(){
var incorrectElement=document.getElementById('incorrect');
if(isLoginEmpty()==false){
incorrectElement.innerHTML='<span class="text-danger m-3">All inputs are required</span>';
return;
}
var enteredPassword=signinPassword.value;
var enteredEmail=signinEmail.value;
var foundUser=false;
for(var i=0;i<signUpArray.length;i++){
if(signUpArray[i].email.toLowerCase()==enteredEmail.toLowerCase()&&signUpArray[i].password.toLowerCase()==enteredPassword.toLowerCase()){
localStorage.setItem('sessionUsername',signUpArray[i].name);
incorrectElement.innerHTML='';
signinPassword.value='';
location.replace(baseURL+'pages/welcome.html');
foundUser=true;
break;
}
}
if(foundUser===false){
incorrectElement.innerHTML='<span class="p-2 text-danger">Incorrect email or password</span>';
signinPassword.value='';
}
}
function logout(){
localStorage.removeItem('sessionUsername');
window.location.href=baseURL+'index.html';
}
