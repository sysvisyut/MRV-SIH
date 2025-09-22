// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProjectRegistry {
    struct Project {
        string name;
        string description;
        address owner;
        uint256 totalCredits;
        uint256 creditsMinted;
        bool exists;
    }

    mapping(uint256 => Project) private projects;
    uint256 public nextProjectId;

    event ProjectRegistered(uint256 indexed projectId, string name, address indexed owner, uint256 totalCredits);

    function registerProject(
        string memory name,
        string memory description,
        uint256 totalCredits
    ) external returns (uint256 projectId) {
        require(totalCredits > 0, "totalCredits must be > 0");
        projectId = nextProjectId++;
        projects[projectId] = Project({
            name: name,
            description: description,
            owner: msg.sender,
            totalCredits: totalCredits,
            creditsMinted: 0,
            exists: true
        });
        emit ProjectRegistered(projectId, name, msg.sender, totalCredits);
    }

    function getProject(uint256 projectId)
        external
        view
        returns (
            string memory name,
            string memory description,
            address owner,
            uint256 totalCredits,
            uint256 creditsMinted
        )
    {
        Project storage p = projects[projectId];
        require(p.exists, "project not found");
        return (p.name, p.description, p.owner, p.totalCredits, p.creditsMinted);
    }

    function incrementMinted(uint256 projectId, uint256 amount) external {
        Project storage p = projects[projectId];
        require(p.exists, "project not found");
        p.creditsMinted += amount;
        require(p.creditsMinted <= p.totalCredits, "exceeds total credits");
    }
}
