// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title VibeOracle - On-Chain Sentiment Oracle for Trenches/Base
/// @notice AI-powered sentiment analysis for crypto tokens, powered by Claude AI
/// @author VibeOracle Team - Built for Vibe Coding Hackathon by CreatorBid

contract SentimentOracle {
    struct SentimentData {
        int8 score;              // -100 to +100 sentiment score
        uint32 confidence;       // 0-100 confidence percentage
        uint64 timestamp;        // Last update timestamp
        uint32 mentionCount;     // Number of social mentions analyzed
        string summary;          // AI-generated sentiment summary
        uint8 manipulationRisk;  // 0=low, 1=medium, 2=high
        int8 trend;              // -1=down, 0=stable, 1=up
    }

    struct TokenMetadata {
        string name;
        string symbol;
        bool isActive;
        uint64 addedAt;
    }

    address public owner;
    address public oracleUpdater;

    mapping(address => SentimentData) public sentiments;
    mapping(address => TokenMetadata) public tokenMetadata;
    address[] public trackedTokens;
    mapping(address => bool) public isTracked;
    mapping(address => int8[]) public scoreHistory;

    uint256 public totalUpdates;
    uint64 public lastGlobalUpdate;

    event SentimentUpdated(
        address indexed token, 
        int8 score, 
        uint32 confidence, 
        uint32 mentionCount, 
        string summary,
        uint8 manipulationRisk,
        int8 trend
    );

    event TokenAdded(address indexed token, string name, string symbol);
    event TokenRemoved(address indexed token);
    event OracleUpdaterChanged(address indexed oldUpdater, address indexed newUpdater);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyUpdater() {
        require(msg.sender == oracleUpdater || msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
        oracleUpdater = msg.sender;
    }

    /// @notice Update sentiment data for a token
    /// @param token Token contract address
    /// @param score Sentiment score from -100 to +100
    /// @param confidence Confidence level 0-100
    /// @param mentionCount Number of mentions analyzed
    /// @param summary AI-generated summary
    /// @param manipulationRisk Risk level (0=low, 1=medium, 2=high)
    /// @param trend Price/sentiment trend (-1, 0, 1)
    function updateSentiment(
        address token,
        int8 score,
        uint32 confidence,
        uint32 mentionCount,
        string calldata summary,
        uint8 manipulationRisk,
        int8 trend
    ) external onlyUpdater {
        require(score >= -100 && score <= 100, "Score out of range");
        require(confidence <= 100, "Confidence out of range");
        require(manipulationRisk <= 2, "Invalid manipulation risk");
        require(trend >= -1 && trend <= 1, "Invalid trend");

        sentiments[token] = SentimentData(
            score,
            confidence,
            uint64(block.timestamp),
            mentionCount,
            summary,
            manipulationRisk,
            trend
        );

        scoreHistory[token].push(score);

        // Keep only last 100 scores
        if (scoreHistory[token].length > 100) {
            // Shift array - gas intensive but acceptable for demo
            for (uint i = 0; i < 99; i++) {
                scoreHistory[token][i] = scoreHistory[token][i + 1];
            }
            scoreHistory[token].pop();
        }

        if (!isTracked[token]) {
            trackedTokens.push(token);
            isTracked[token] = true;
            tokenMetadata[token].addedAt = uint64(block.timestamp);
            tokenMetadata[token].isActive = true;
        }

        totalUpdates++;
        lastGlobalUpdate = uint64(block.timestamp);

        emit SentimentUpdated(token, score, confidence, mentionCount, summary, manipulationRisk, trend);
    }

    /// @notice Batch update multiple tokens
    function batchUpdateSentiment(
        address[] calldata tokens,
        int8[] calldata scores,
        uint32[] calldata confidences,
        uint32[] calldata mentionCounts,
        string[] calldata summaries,
        uint8[] calldata manipulationRisks,
        int8[] calldata trends
    ) external onlyUpdater {
        require(tokens.length == scores.length, "Length mismatch");
        require(tokens.length == confidences.length, "Length mismatch");
        require(tokens.length == mentionCounts.length, "Length mismatch");
        require(tokens.length == summaries.length, "Length mismatch");
        require(tokens.length == manipulationRisks.length, "Length mismatch");
        require(tokens.length == trends.length, "Length mismatch");

        for (uint i = 0; i < tokens.length; i++) {
            this.updateSentiment(
                tokens[i],
                scores[i],
                confidences[i],
                mentionCounts[i],
                summaries[i],
                manipulationRisks[i],
                trends[i]
            );
        }
    }

    /// @notice Set token metadata
    function setTokenMetadata(address token, string calldata name, string calldata symbol) external onlyUpdater {
        tokenMetadata[token].name = name;
        tokenMetadata[token].symbol = symbol;
        emit TokenAdded(token, name, symbol);
    }

    /// @notice Get complete sentiment data for a token
    function getSentiment(address token) external view returns (SentimentData memory) {
        return sentiments[token];
    }

    /// @notice Get all tracked tokens
    function getTrackedTokens() external view returns (address[] memory) {
        return trackedTokens;
    }

    /// @notice Get score history for a token
    function getScoreHistory(address token) external view returns (int8[] memory) {
        return scoreHistory[token];
    }

    /// @notice Get recent score history (last n scores)
    function getRecentScoreHistory(address token, uint256 count) external view returns (int8[] memory) {
        int8[] storage history = scoreHistory[token];
        uint256 len = history.length;
        if (count >= len) {
            return history;
        }

        int8[] memory recent = new int8[](count);
        for (uint i = 0; i < count; i++) {
            recent[i] = history[len - count + i];
        }
        return recent;
    }

    /// @notice Get oracle statistics
    function getOracleStats() external view returns (
        uint256 _totalUpdates,
        uint256 _trackedTokenCount,
        uint64 _lastUpdate
    ) {
        return (totalUpdates, trackedTokens.length, lastGlobalUpdate);
    }

    /// @notice Change the oracle updater address
    function setOracleUpdater(address newUpdater) external onlyOwner {
        require(newUpdater != address(0), "Invalid address");
        address oldUpdater = oracleUpdater;
        oracleUpdater = newUpdater;
        emit OracleUpdaterChanged(oldUpdater, newUpdater);
    }

    /// @notice Transfer contract ownership
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    /// @notice Deactivate a token (stop tracking)
    function deactivateToken(address token) external onlyOwner {
        tokenMetadata[token].isActive = false;
        emit TokenRemoved(token);
    }
}
