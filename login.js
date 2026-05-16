const SUPABASE_URL = 'https://xcocurbfqrbdcxodervh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Hx4kd52YxbmTDREmGLhbGw_x7XzAwKa';
const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
const { error } = await client.auth.signInWithPassword({ email, password });

if(error){
        message.textContent = error.message;
    } else {
        window.location.href = 'index.html';
    }
}

async function signUp(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const massage = document.getElementById('massage');
    const {error} = await client.auth.signUp({email, password});

if(error){
    message.style.color = 'red';
    message.textContent = error.message;
 } else {
    message.style.color = 'green';
    message.textContent = 'Check your email to confirm signup!';
}

}    

async function googleLogin{
    const { error } = await client.auth.signInWithOAuth({
          provider: 'google',
        options: {
            redirectTo: 'https://my-dashboard-aboz.onrender.com/index.html'
        }
    });

    if(error){
        document.getElementById('message').textContent = error.message;
    }
}

