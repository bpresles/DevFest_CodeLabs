// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Management of Competition
/// @author Colas Vincent
/// @notice Smart contract to management digital Competition for the festival.
contract Competitions is Ownable {

    /// @notice Enum of type competition.
    enum  TypeCompetitions {
        Actor,
        Director,
        Movie
    }

    /// @notice Structure of option competition
    struct Option {
        uint tokenId;
        uint voteCount;
    }

    /// @notice Voter structure
    struct Voter {
        address voter;
        bool hasVoted;
    }

    /// @notice Voting competition structure to store a voting competition details.
    struct CompetitionVotingSession {
        uint id;
        string title;
        TypeCompetitions typeCompetitions;
        uint startTime;
        uint endTime;
    }

    /// @notice Enum with the possible status for a competition session.
    enum  VotingCompetitionStatus {
        Pending,
        InProgress,
        Ended
    }

    CompetitionVotingSession[] votingCompetitions;
    mapping (uint => mapping(address => Voter)) votingCompetitionsVoters;
    mapping (uint => address[]) jurysByCompetition;
    mapping (uint => Option[]) optionsByCompetition;

    /// Event
    event CompetitionSessionRegistered(uint competitionId);
    event Voted(uint competitionId, bool vote, uint voices);

    /// @notice Adds a voting session for a competition.
    /// @dev Administrator defines voting period, competition, voting panel and options. event CompetitionSessionRegistered when competition has been registered
    /// @param _jury List of voting juries.
    /// @param _title Competition title.
    /// @param _idsOption List of ids in competition (film, actor, director).
    /// @param _typeCompetitions Defines the type of options.
    /// @param _startDate Voting session start date.
    /// @param _endDate End date of voting session.
    function addCompetition(address[] memory _jury, string memory _title, uint[] memory _idsOption, TypeCompetitions _typeCompetitions, uint _startDate, uint _endDate) external onlyOwner {
        require(_startDate > block.timestamp, "Your competition can't be in the past");
        require(_startDate < _endDate, "Your competition end date can't be before the start date");
        require(keccak256(abi.encode(_title)) != keccak256(abi.encode("")), "Your competition can't be empty");
        require(_jury.length >= 2, "Your competition must contain jurys");
        require(_idsOption.length >= 4, "Your competition must contain at least 4 options");
        require(keccak256(abi.encode(_typeCompetitions)) != keccak256(abi.encode("")), "Your competition must contain type of competition");

        uint tokenId = votingCompetitions.length +1;

        CompetitionVotingSession memory newCompetitionVotingSession = CompetitionVotingSession(tokenId, _title, _typeCompetitions, _startDate, _endDate);

        votingCompetitions.push(newCompetitionVotingSession);

        for(uint i = 0; i < _jury.length; i++){
            jurysByCompetition[tokenId].push(_jury[i]);
        }

        for(uint i = 0; i < _idsOption.length; i++){
            Option memory newOption = Option(_idsOption[i], 0);
            optionsByCompetition[tokenId].push(newOption);
        }

        emit CompetitionSessionRegistered(tokenId);
    }

    /// @notice Gets the voting competition status according to the current timestamp.
    /// @param _competitionId The voting competition number.
    /// @return The voting competition status.
    function getVotingCompetitionStatus(uint _competitionId) external view returns (VotingCompetitionStatus){
        require(_competitionId <= votingCompetitions.length, "Competition: Voting competition doesn't exist");

        if (votingCompetitions[_competitionId].startTime > block.timestamp) {
            return VotingCompetitionStatus.Pending;
        }
        else if (votingCompetitions[_competitionId].endTime < block.timestamp) {
            return VotingCompetitionStatus.Ended;
        }

        return VotingCompetitionStatus.InProgress;
    }

    /// @notice Returns whether the user has voted on the voting competition.
    /// @param _competitionId The voting competition identifier.
    /// @return True if msg.sender has already voted on this competition id.
    function getVoterStatus(uint _competitionId) external view returns(bool) {
        require(_competitionId <= votingCompetitions.length, "Competition: Voting competition doesn't exist");
        require(controleJuryByCompetition(_competitionId), "Competition: Doesn't access voting");

        return votingCompetitionsVoters[_competitionId][msg.sender].hasVoted;
    }

    /// @notice Checking whether a jury has access to a competition
    /// @param _competitionId The competition identifier.
    /// @return True if the msg.sender has access to this competition.
    function controleJuryByCompetition(uint _competitionId)internal view returns(bool){
        bool contain = false;

        for(uint i = 0; i < jurysByCompetition[_competitionId].length; i++){
            if(jurysByCompetition[_competitionId][i] == _msgSender()){
                contain = true;
            }
        }
        return contain;
    }

    /// @notice Allows you to vote for an option in a competition during a voting session.
    /// @dev Voting is only possible if the timestamp of the current block is between startTime and endTime of the session and if the voter's address is in the list. event Voted when jury has been voted
    /// @param _competitionId The voting competition on which the voter wants to vote.
    /// @param _tokenIdOption The token id of the option chosen by the voter.
    function voteOnCompetition(uint _competitionId, uint _tokenIdOption) external {
        require(_competitionId <= votingCompetitions.length, "Competition: Voting competition doesn't exist");
        require(controleJuryByCompetition(_competitionId), "Competition: Doesn't access voting");
        require(votingCompetitions[_competitionId].startTime < block.timestamp, "Voting competition isn't open yet");
        require(votingCompetitionsVoters[_competitionId][msg.sender].hasVoted == false, "You have already voted");
        uint nbVote;

        for(uint i = 0; i < optionsByCompetition[_competitionId].length; i++ ){
            if(optionsByCompetition[_competitionId][i].tokenId == _tokenIdOption){
                optionsByCompetition[_competitionId][i].voteCount++;
                nbVote = optionsByCompetition[_competitionId][i].voteCount;
            }
        }

        votingCompetitionsVoters[_competitionId][msg.sender] = Voter(msg.sender, true);

        emit Voted(_competitionId, true, nbVote);
    }
}
