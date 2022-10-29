const dotenv = require('dotenv');
const {Octokit} = require("octokit");

dotenv.config({path:'../config.env'});
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN});

async function get_user(token)
{
    const user = await (await octokit.request('GET /user')).data.login;
    return user;
}

async function get_repo_list()
{
    let repo_list=[];
    const repo = await octokit.request('GET /user/repos',{});
    
    for (let i=0; i<repo.data.length; i++)
    {
        repo_list.push(repo.data[i].name);
    }

    return repo_list;
}

async function rename_branch (repo_name, old_branch_name, new_branch_name)
{
    if ( (await check_branch_name(repo_name, old_branch_name)==false) || (await check_branch_name(repo_name, new_branch_name)==true) )
    {
        console.log('Invalid Branch Name Provided');
        return;
    }

    let username = await get_user();
    const branch = await octokit.request('POST /repos/' + username + '/' + repo_name +'/branches/' + old_branch_name + '/rename', {new_name: new_branch_name});

    if(branch.status==201)
    {
        console.log('Branch Renamed Succesfully');
    }
    else
    {
        console.log('Error Ocurred while renaming branch');
    }
}   

async function get_branch_list (repo_name)
{
    if(await check_repo_exist(repo_name)==false)
    {
        return;
    }

    let username = await get_user();    
    let branch_list=[];
    
    const list_branch = await octokit.request('GET /repos/' + username + '/' + repo_name +'/branches');
    
    for (let i=0; i<list_branch.data.length; i++)
    {
        branch_list.push(list_branch.data[i].name);
    }

    return branch_list;
}

async function delete_branch (repo_name, branch_name)
{
    if (await check_branch_name(repo_name, branch_name)==false)
    {
        return;
    }

    let username = await get_user();
    const delete_Branch = await octokit.request('DELETE /repos/' + username + '/' + repo_name +'/git/refs/heads/' + branch_name);

    if (delete_Branch.status==204)
    {
        console.log("Branch Deleted Successfuly!");
    }
    else
    {
        console.log("Branch Couldn't be deleted.");
    }
}

async function create_branch (repo_name, parent_branch_name, create_branch_name)
{
    if ( (await check_branch_name(repo_name, parent_branch_name)==false) || (await check_branch_name(repo_name, create_branch_name)==true) )
    {
        return;
    }

    let username = await get_user();
    const list_ref = await octokit.request('GET /repos/' + username + '/' + repo_name +'/git/ref/heads/' + parent_branch_name);
    const sha = list_ref.data.object.sha;

    const create_ref = await octokit.request('POST /repos/' + username + '/' + repo_name +'/git/refs',{
        ref: 'refs/heads/' + create_branch_name,
        sha: sha
    });

    if (create_ref.status==201)
    {
        console.log("Branch Created Successfuly!");
    }
    else
    {
        console.log("Branch Couldn't be created.");
    }
}

async function lock_branch (repo_name, branch_name)
{
    if (await check_branch_name(repo_name, branch_name)==false)
    {
        return;
    }

    let username = await get_user();
    const branch_protection = await octokit.request('PUT /repos/' + username + '/' + repo_name +'/branches/'+ branch_name +'/protection',{
        required_status_checks:
        {
            strict: true,
            context: ['success'],
        },
        
        enforce_admins: true,

        required_pull_request_reviews:
        {
            required_approving_review_count: 1,
        },
        
        restrictions: null,
        
    });

    // const branch_protection = await octokit.request('PATCH /repos/' + owner_name + '/' + repo_name +'/branches/'+ branch_name +'/protection/required_pull_request_reviews',{
    //     require_code_owner_reviews: true
    // });
    // console.log(branch_protection);
}

const check_username = async(username) => {
    
    let user = await get_user();
    let res=false;

    if(username==user)
    {
        res=true;
        console.log("Username verified");
    }
    else
    {
        console.log("Username doesn't exist.");
    }
    
    return res;
}

const check_repo_exist = async(repo_name) => {
    
    let res = false;
    let repo_list = await get_repo_list();

    for(let repo of repo_list)
    {
        if(repo.toLowerCase() == repo_name.toLowerCase())
        {
            res=true;
            console.log(repo_name + " : Repository exist.");
            break;
        }
    }

    if(!res)
    {
        console.log(repo_name + " : Repository doesn't exist.");
    }
    
    return res;
}

const check_branch_name = async(repo_name, branch_name) => {
    
    let res = false;

    let branch_list = await get_branch_list (repo_name);
    
    for(let branch of branch_list)
    {
        if(branch == branch_name)
        {
            res=true;
            console.log(branch_name + " : Branch exist.");
            break;
        }
    }

    if(!res)
    {
        console.log(branch_name + " : Branch doesn't exist.");
    }

    return res;
}

async function print_branches(repo_name)
{
    const branch_list = await get_branch_list('MOSIP_Test');
    for(branch of branch_list)
        console.log(branch);
}

async function print_repo()
{
    const repo_list = await get_repo_list();
    for(repo of repo_list)
        console.log(repo);
}

module.exports = {
    get_user, get_repo_list, get_branch_list,
    check_branch_name, check_username, check_repo_exist,
    rename_branch, delete_branch, create_branch, lock_branch,
    // print_branches, print_repo
};