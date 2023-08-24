import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [commits, setCommits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingContributors, setLoadingContributors] = useState(true);
  const [loadingCommits, setLoadingCommits] = useState(true);
  const commitsPerPage = 5;

  useEffect(() => {
    const contributorsUrl = 'https://api.github.com/repos/naduncalcey/pokemon-tcg-app/contributors';
    const commitsUrl = 'https://api.github.com/repos/naduncalcey/pokemon-tcg-app/commits';

    const headers = new Headers({
      Authorization: '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',
    });

    // Fetch contributors
    fetch(contributorsUrl, { headers })
      .then(response => response.json())
      .then(data => {
        setContributors(data);
        setLoadingContributors(false);
      })
      .catch(error => {
        console.error('Error fetching contributors:', error);
        setLoadingContributors(false);
      });

    // Fetch commits
    fetch(commitsUrl, { headers })
      .then(response => response.json())
      .then(data => {
        setCommits(data);
        setLoadingCommits(false);
      })
      .catch(error => {
        console.error('Error fetching commits:', error);
        setLoadingCommits(false);
      });
  }, []);

  const contributorsArray = Object.values(contributors);

  const indexOfLastCommit = currentPage * commitsPerPage;
  const indexOfFirstCommit = indexOfLastCommit - commitsPerPage;
  const currentCommits = commits.slice(indexOfFirstCommit, indexOfLastCommit);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h2>Contributors</h2>
      {loadingContributors ? (
        <CircularProgress />
      ) : (
        <ul>
          {contributorsArray.map(contributor => (
            <li key={contributor.id}>
              <img src={contributor.avatar_url} alt={contributor.login} width="50" height="50" />
              <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
                {contributor.login}
              </a>
            </li>
          ))}
        </ul>
      )}

      <h2>Previous Commits</h2>
      {loadingCommits ? (
        <CircularProgress />
      ) : (
        <ul>
          {currentCommits.map(commit => (
            <li key={commit.sha}>{commit.commit.message}</li>
          ))}
        </ul>
      )}

      <Pagination
        count={Math.ceil(commits.length / commitsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Contributors;