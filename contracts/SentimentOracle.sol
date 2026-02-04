// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title VibeOracle - On-Chain Sentiment Oracle for Trenches/Base

contract SentimentOracle {
    struct SentimentData {
            int8 score;
                    uint32 confidence;
                            uint64 timestamp;
                                    uint32 mentionCount;
                                            string summary;
                                                }

                                                    address public owner;
                                                        address public oracleUpdater;
                                                            mapping(address => SentimentData) public sentiments;
                                                                address[] public trackedTokens;
                                                                    mapping(address => bool) public isTracked;
                                                                        mapping(address => int8[]) public scoreHistory;

                                                                            event SentimentUpdated(address indexed token, int8 score, uint32 confidence, uint32 mentionCount, string summary);

                                                                                modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
                                                                                    modifier onlyUpdater() { require(msg.sender == oracleUpdater || msg.sender == owner, "Not authorized"); _; }

                                                                                        constructo

                                                                                            function updateSentiment(address token, int8 score, uint32 confidence, uint32 mentionCount, string calldata summary) external onlyUpdater {
                                                                                                    require(score >= -100 && score <= 100, "Score out of range");
                                                                                                            sentiments[token] = SentimentData(score, confidence, uint64(block.timestamp), mentionCount, summary);
                                                                                                                    scoreHistory[token].push(score);
                                                                                                                            if (!isTracked[token]) { trackedTokens.push(token); isTracked[token] = true; }
                                                                                                                                    emit SentimentUpdated(token, score, confidence, mentionCount, summary);
                                                                                                                                        }
                                                                                                                                        
                                                                                                                                            function getSentiment(address token) external view returns (SentimentData memory) { return sentiments[token]; }
                                                                                                                                                function getTrackedTokens() external view returns (address[] memory) { return trackedTokens; }
                                                                                                                                                    function getScoreHistory(address token) external view returns (int8[] memory) { return scoreHistory[token]; }
                                                                                                                                                        function setOracleUpdater(address newUpdater) external onlyOwner { oracleUpdater = newUpdater; }
                                                                                                                                                            function transferOwnership(address newOwner) external onlyOwner { require(newOwner != address(0)); owner = newOwner; }
                                                                                                                                                            }
